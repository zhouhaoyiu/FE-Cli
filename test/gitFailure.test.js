const execa = require("execa");
const fs = require("fs");
const os = require("os");
const path = require("path");

test("a failed initial commit exits nonzero and does not publish the project", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "fe-cli-commit-failure-"));
  try {
    const gitconfig = path.join(root, "gitconfig");
    fs.writeFileSync(gitconfig, '[user]\nuseConfigOnly = true\nname = ""\nemail = ""\n');
    const env = { ...process.env };
    for (const key of Object.keys(env)) if (key.startsWith("GIT_")) delete env[key];
    Object.assign(env, { GIT_CONFIG_GLOBAL: gitconfig, GIT_CONFIG_NOSYSTEM: "1", LC_ALL: "C" });
    const result = await execa(process.execPath, [path.resolve(__dirname, "../fe.js"), "init", "demo", "-d", "--gitinit"], {
      cwd: root,
      env,
      extendEnv: false,
      reject: false,
      timeout: 10000
    });
    expect(result.code).toBe(1);
    expect(result.stderr).toContain("commit -m init");
    expect(result.stdout).not.toContain("success created");
    expect(fs.readdirSync(root)).toEqual(["gitconfig"]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
