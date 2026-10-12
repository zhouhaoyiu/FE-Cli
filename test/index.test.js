const execa = require("execa");
const fs = require("fs");
const os = require("os");
const path = require("path");

jest.setTimeout(120000);
const repo = path.resolve(__dirname, "..");
const cli = path.join(repo, "fe.js");
let root, env;
let sequence = 0;

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "fe-cli-tests-"));
  const gitconfig = path.join(root, "gitconfig");
  const hooks = path.join(root, "empty-hooks");
  fs.mkdirSync(hooks);
  fs.writeFileSync(gitconfig, `[user]\nname = FE CLI Test\nemail = fe-cli-test@example.invalid\n[commit]\ngpgsign = false\n[core]\nhooksPath = ${hooks}\n`);
  env = { ...process.env };
  for (const key of Object.keys(env)) if (key.startsWith("GIT_")) delete env[key];
  Object.assign(env, { GIT_CONFIG_GLOBAL: gitconfig, GIT_CONFIG_NOSYSTEM: "1", FORCE_COLOR: "0", NODE_ENV: "test" });
});
afterAll(() => fs.rmSync(root, { recursive: true, force: true }));

function workspace() {
  const dir = path.join(root, String(++sequence));
  fs.mkdirSync(dir);
  return dir;
}
function command(name, args, cwd, options = {}) {
  return execa(name, args, { cwd, env, extendEnv: false, timeout: 60000, ...options });
}
const runCli = (args, cwd, options) => command(process.execPath, [cli, ...args], cwd, options);
const npm = (args, cwd) => command("npm", args, cwd);

async function interactive(args, cwd, answers) {
  const child = runCli(args, cwd);
  let output = "",
    index = 0;
  child.stdout.on("data", chunk => {
    output += chunk;
    if (index < answers.length && output.includes(answers[index][0])) {
      const answer = answers[index++][1];
      output = "";
      child.stdin.write(answer);
    }
  });
  const result = await child;
  expect(index).toBe(answers.length);
  return result;
}

async function checkDevReload(cwd, extension) {
  const helloPath = path.join(cwd, `src/hello/index.${extension}`);
  const original = fs.readFileSync(helloPath, "utf8");
  const child = command("npm", ["run", "dev"], cwd, { detached: process.platform !== "win32", timeout: 30000 });
  const completion = child.then(
    result => result,
    error => error
  );
  let output = "",
    changed = false;
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Dev server did not reload:\n${output}`)), 25000);
      child.stdout.on("data", chunk => {
        output += chunk;
        if (!changed && output.includes("hello world")) {
          changed = true;
          fs.writeFileSync(helloPath, original.replace("hello world", "hello again"));
        }
        if (output.includes("hello again")) {
          clearTimeout(timer);
          resolve();
        }
      });
      child.stderr.on("data", chunk => {
        output += chunk;
      });
      completion.then(() => {
        clearTimeout(timer);
        reject(new Error(`Dev command stopped before reload:\n${output}`));
      });
    });
  } finally {
    if (process.platform === "win32") {
      await command("taskkill", ["/pid", String(child.pid), "/T", "/F"], cwd, { reject: false });
    } else {
      try {
        process.kill(-child.pid, "SIGTERM");
      } catch {
        child.kill("SIGTERM");
      }
    }
    await completion;
    fs.writeFileSync(helloPath, original);
  }
}

test.each([{ template: [] }, { template: ["--template", "js"] }, { template: ["--template", "ts"] }])("default initialization honors $template", async ({ template }) => {
  const cwd = workspace();
  await runCli(["init", "demo", "-d", ...template, "--author", "Test Author"], cwd);
  const project = path.join(cwd, "demo");
  const pkg = JSON.parse(fs.readFileSync(path.join(project, "package.json"), "utf8"));
  expect(pkg).toMatchObject({ name: "demo", version: "1.0.0", author: "Test Author", type: "commonjs" });
  expect(fs.existsSync(path.join(project, template.includes("ts") ? "src/index.ts" : "src/index.js"))).toBe(true);
});

test("plain init completes interactive prompts and preserves the git flag", async () => {
  const cwd = workspace();
  await interactive(["init", "interactive", "--gitinit", "--author", "Tester"], cwd, [
    ["Project name", "\n"],
    ["Project description", "\n"],
    ["Author", "\n"],
    ["Version", "\n"],
    ["License", "\n"],
    ["Which dependencies", "\n"]
  ]);
  const project = path.join(cwd, "interactive");
  expect((await command(process.execPath, ["src/index.js"], project)).stdout).toBe("hello world");
  expect((await command("git", ["log", "-1", "--format=%s"], project)).stdout).toBe("init");
});

test.each(["js", "ts"])("%s template installs, runs, tests and reloads after source changes", async template => {
  const cwd = workspace();
  await runCli(["init", "demo", "--template", template], cwd);
  const project = path.join(cwd, "demo");
  await npm(["install", "--ignore-scripts", "--no-audit", "--no-fund"], project);
  if (template === "ts") {
    const tsc = path.join(project, "node_modules/typescript/bin/tsc");
    const config = JSON.parse((await command(process.execPath, [tsc, "--showConfig"], project)).stdout);
    expect(config.compilerOptions).toMatchObject({ strict: true, module: "commonjs", outDir: "./dist" });
    const invalid = path.join(project, "src/invalid.ts");
    fs.writeFileSync(invalid, "const value: string = 123;\n");
    const failure = await command("npm", ["run", "build"], project, { reject: false });
    expect(failure.code).toBeGreaterThan(0);
    expect(failure.stdout).toContain("TS2322");
    fs.unlinkSync(invalid);
    await npm(["run", "build"], project);
  }
  expect((await npm(["start"], project)).stdout).toContain("hello world");
  expect((await npm(["test"], project)).stdout).toContain("prints a greeting");
  await checkDevReload(project, template);
});

test.each(["--gitinit", "-gi"])("%s initializes and commits only the generated repository", async flag => {
  const cwd = workspace();
  await command("git", ["init"], cwd);
  fs.writeFileSync(path.join(cwd, "sentinel"), "parent repository");
  await command("git", ["add", "sentinel"], cwd);
  await command("git", ["commit", "-m", "parent"], cwd);
  const before = (await command("git", ["rev-parse", "HEAD"], cwd)).stdout;
  await runCli(["init", "demo", "-d", flag], cwd);
  const project = path.join(cwd, "demo");
  expect(fs.statSync(path.join(project, ".gitignore")).isFile()).toBe(true);
  expect((await command("git", ["rev-parse", "--show-toplevel"], project)).stdout).toBe(fs.realpathSync(project));
  expect((await command("git", ["log", "-1", "--format=%s"], project)).stdout).toBe("init");
  expect((await command("git", ["status", "--porcelain"], project)).stdout).toBe("");
  expect((await command("git", ["ls-files"], project)).stdout).toContain("package.json");
  expect((await command("git", ["check-ignore", "node_modules/example.js", "dist/index.js"], project)).stdout).toContain("node_modules/example.js");
  expect((await command("git", ["rev-parse", "HEAD"], cwd)).stdout).toBe(before);
});

test.each(["n\n", "\n"])("declining overwrite preserves the existing project (%j)", async input => {
  const cwd = workspace();
  fs.mkdirSync(path.join(cwd, "demo"));
  fs.writeFileSync(path.join(cwd, "demo/sentinel"), "original");
  const result = await runCli(["init", "demo", "-d"], cwd, { input });
  expect(result.stdout).toContain("cancelled");
  expect(result.stdout).not.toContain("success created");
  expect(fs.readdirSync(path.join(cwd, "demo"))).toEqual(["sentinel"]);
  expect(fs.readdirSync(cwd)).toEqual(["demo"]);
});

test("confirming overwrite replaces the old project with a runnable project", async () => {
  const cwd = workspace();
  fs.mkdirSync(path.join(cwd, "demo"));
  fs.writeFileSync(path.join(cwd, "demo/sentinel"), "original");
  const result = await runCli(["init", "demo", "-d"], cwd, { input: "y\n" });
  expect(result.stdout).toContain("success created");
  expect(fs.existsSync(path.join(cwd, "demo/sentinel"))).toBe(false);
  expect((await command(process.execPath, ["src/index.js"], path.join(cwd, "demo"))).stdout).toBe("hello world");
  expect(fs.readdirSync(cwd)).toEqual(["demo"]);
});

test.each([false, true])("failed git commands exit nonzero and preserve existing files (overwrite=%j)", async overwrite => {
  const cwd = workspace();
  const gitconfig = path.join(cwd, "invalid-gitconfig");
  fs.writeFileSync(gitconfig, "[this is not a valid git config\n");
  if (overwrite) {
    fs.mkdirSync(path.join(cwd, "demo"));
    fs.writeFileSync(path.join(cwd, "demo/sentinel"), "original");
  }
  const result = await runCli(["init", "demo", "-d", "--gitinit"], cwd, { env: { ...env, GIT_CONFIG_GLOBAL: gitconfig }, input: "y\n", reject: false });
  expect(result.code).toBe(1);
  expect(result.stderr).toContain("bad config");
  expect(result.stdout).not.toContain("success created");
  if (overwrite) expect(fs.readFileSync(path.join(cwd, "demo/sentinel"), "utf8")).toBe("original");
  else expect(fs.existsSync(path.join(cwd, "demo"))).toBe(false);
  expect(fs.readdirSync(cwd).some(name => name.startsWith(".fe-cli-"))).toBe(false);
});

test.each(["PORT=3000\n", "", "NODE_ENV=development\nPORT=3000\n"])("unrelated or empty .env files do not break startup (%j)", async contents => {
  const cwd = workspace();
  fs.writeFileSync(path.join(cwd, ".env"), contents);
  const localEnv = { ...env };
  delete localEnv.NODE_ENV;
  expect((await runCli(["--help"], cwd, { env: localEnv })).stdout).toContain("Usage:");
  await runCli(["init", "demo", "-d"], cwd, { env: localEnv });
  expect(fs.existsSync(path.join(cwd, "demo/package.json"))).toBe(true);
});

test.each(["react", "vue2", "vue3", "missing", ""])("unsupported template %j exits nonzero before creating files", async template => {
  const cwd = workspace();
  const result = await runCli(["init", "demo", "-d", "--template", template], cwd, { reject: false });
  expect(result.code).toBe(1);
  expect(result.stderr).toContain("Unsupported template");
  expect(fs.readdirSync(cwd)).toEqual([]);
});

test.each(["..", "../outside", ".", "nested/project"])("invalid project name %j cannot overwrite another path", async name => {
  const cwd = workspace();
  const result = await runCli(["init", name, "-d"], cwd, { reject: false });
  expect(result.code).toBe(1);
  expect(result.stderr).toContain("Project name");
  expect(fs.readdirSync(cwd)).toEqual([]);
});

test("an existing symbolic link cannot redirect an overwrite", async () => {
  const cwd = workspace(),
    outside = workspace();
  fs.writeFileSync(path.join(outside, "sentinel"), "original");
  fs.symlinkSync(outside, path.join(cwd, "demo"), "dir");
  const result = await runCli(["init", "demo", "-d"], cwd, { reject: false, input: "y\n" });
  expect(result.code).toBe(1);
  expect(result.stderr).toContain("symbolic link");
  expect(fs.readFileSync(path.join(outside, "sentinel"), "utf8")).toBe("original");
});

test("a production-only package installation starts and generates a runnable project", async () => {
  const cwd = workspace();
  const packed = JSON.parse((await npm(["pack", "--ignore-scripts", "--json", "--pack-destination", cwd], repo)).stdout);
  const consumer = path.join(cwd, "consumer");
  fs.mkdirSync(consumer);
  fs.writeFileSync(path.join(consumer, "package.json"), '{"private":true}\n');
  await npm(["install", "--omit=dev", "--ignore-scripts", "--no-audit", "--no-fund", path.join(cwd, packed[0].filename)], consumer);
  const installedCli = path.join(consumer, "node_modules/fe-cli/fe.js");
  expect((await command(process.execPath, [installedCli, "--help"], consumer)).stdout).toContain("Usage:");
  await command(process.execPath, [installedCli, "init", "demo", "-d"], consumer);
  expect((await command(process.execPath, ["src/index.js"], path.join(consumer, "demo"))).stdout).toBe("hello world");
});
