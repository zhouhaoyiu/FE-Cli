const fs = require("fs");
const os = require("os");
const path = require("path");
const { stripVTControlCharacters } = require("node:util");
const execa = require("execa");
const cli = path.resolve(__dirname, "../fe.js");
const { templateNames, templates } = require("../src/bin/templates");
jest.setTimeout(180000);
let root, env;

beforeAll(() => {
  const parent = process.env.FE_CLI_TEST_PROJECTS || os.tmpdir();
  fs.mkdirSync(parent, { recursive: true });
  root = fs.mkdtempSync(path.join(parent, "fe-cli-template-tests-"));
  if (process.env.FE_CLI_TEST_PROJECTS) console.info(`Generated template fixtures: ${root}`);
  env = { ...process.env, FORCE_COLOR: "0", NODE_ENV: "test" };
});
afterAll(() => { if (!process.env.FE_CLI_TEST_PROJECTS) fs.rmSync(root, { recursive: true, force: true }); });
const command = (name, args, cwd, options = {}) => execa(name, args, { cwd, env, extendEnv: false, timeout: 120000, ...options });
const npm = (args, cwd, options) => command("npm", args, cwd, options);
const serverURL = output => stripVTControlCharacters(output).match(/http:\/\/127\.0\.0\.1:\d+\//)?.[0];

test("server URL detection accepts plain and ANSI-colored Vite output", () => {
  const url = "http://127.0.0.1:42267/";
  expect(serverURL(`Local: ${url}`)).toBe(url);
  expect(serverURL("\u001b[36mhttp://127.0.0.1:\u001b[1m42267\u001b[22m/\u001b[39m")).toBe(url);
  expect(serverURL("VITE ready in 121 ms")).toBeUndefined();
});

async function withServer(project, script, inspect) {
  const child = npm(["run", script, "--", "--host", "127.0.0.1", "--port", "0"], project, {
    detached: process.platform !== "win32", timeout: 30000, env: { ...env, FORCE_COLOR: "1" }
  });
  let output = "";
  const completion = child.then(value => value, error => error);
  try {
    const url = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Server did not start: ${output}`)), 25000);
      child.stdout.on("data", chunk => {
        output += chunk;
        const url = serverURL(output);
        if (url) { clearTimeout(timer); resolve(url); }
      });
      child.stderr.on("data", chunk => { output += chunk; });
      completion.then(() => { clearTimeout(timer); reject(new Error(`Server stopped: ${output}`)); });
    });
    await inspect(url);
  } finally {
    if (process.platform === "win32") {
      await command("taskkill", ["/pid", String(child.pid), "/T", "/F"], project, { reject: false });
    } else {
      try { process.kill(-child.pid, "SIGTERM"); } catch { child.kill("SIGTERM"); }
    }
    await completion;
  }
}

test("template listing, validation and generation share all eight registered names", async () => {
  const result = await command(process.execPath, [cli, "template"], root);
  expect(templateNames).toEqual(["js", "ts", "react", "react-ts", "vue", "vue-ts", "vanilla", "vanilla-ts"]);
  for (const name of templateNames) expect(result.stdout).toContain(`${name} — ${templates[name].name}`);
});

test.each(templateNames)("%s installs and its ESLint/build/development commands work", async name => {
  const spec = templates[name];
  await command(process.execPath, [cli, "init", name, "--template", name, "--eslint", "--license", "MIT", "--author", "Template Test"], root);
  const project = path.join(root, name);
  const pkg = JSON.parse(fs.readFileSync(path.join(project, "package.json"), "utf8"));
  expect(pkg.scripts.lint).toBeTruthy();
  expect(fs.readFileSync(path.join(project, "LICENSE"), "utf8")).toContain("Permission is hereby granted");
  await npm(["install", "--ignore-scripts", "--no-audit", "--no-fund"], project);
  await npm(["run", "lint"], project);

  const lintFixture = path.join(project, "src", `lint-regression.${spec.typescript ? "ts" : "js"}`);
  fs.writeFileSync(lintFixture, "const unusedRegression = 1;\n");
  try {
    const result = await npm(["run", "lint"], project, { reject: false });
    expect(result.code).toBeGreaterThan(0);
    expect(result.stdout).toContain("unusedRegression");
  } finally { fs.unlinkSync(lintFixture); }

  if (spec.typescript) {
    const typeFixture = path.join(project, "src/type-regression.ts");
    fs.writeFileSync(typeFixture, "export const regressionValue: string = 42;\n");
    try {
      const result = await npm(["run", "build"], project, { reject: false });
      expect(result.code).toBeGreaterThan(0);
      expect(result.stdout).toContain("TS2322");
    } finally { fs.unlinkSync(typeFixture); }
  }
  if (pkg.scripts.build) await npm(["run", "build"], project);

  if (spec.framework === "node") {
    expect((await npm(["start"], project)).stdout).toContain("hello world");
    await npm(["test"], project);
    return;
  }
  expect(pkg.type).toBe("module");
  expect(pkg.private).toBe(true);
  const sourceFile = spec.framework === "react" ? `App.${spec.typescript ? "tsx" : "jsx"}` : spec.framework === "vue" ? "App.vue" : `main.${spec.typescript ? "ts" : "js"}`;
  await withServer(project, "dev", async base => {
    const response = await fetch(base);
    expect(response.status).toBe(200);
    const html = await response.text();
    const main = html.match(/src="(\/src\/main\.[^"]+)"/)[1];
    expect((await fetch(new URL(main, base))).status).toBe(200);
    const sourcePath = path.join(project, "src", sourceFile);
    const original = fs.readFileSync(sourcePath, "utf8");
    try {
      fs.writeFileSync(sourcePath, original.replace("FE-CLI starter", "Updated fixture"));
      const updated = await fetch(new URL(`/src/${sourceFile}?regression=1`, base));
      expect(updated.status).toBe(200);
      expect(await updated.text()).toContain("Updated fixture");
    } finally { fs.writeFileSync(sourcePath, original); }
  });
  await withServer(project, "preview", async base => {
    const response = await fetch(base);
    expect(response.status).toBe(200);
    const html = await response.text();
    const asset = html.match(/src="(\/assets\/[^"]+\.js)"/)[1];
    const javascript = await fetch(new URL(asset, base));
    expect(javascript.status).toBe(200);
    expect((await javascript.text()).length).toBeGreaterThan(100);
  });
});
