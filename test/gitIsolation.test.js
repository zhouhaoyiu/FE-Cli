const fs = require("fs");
const os = require("os");
const path = require("path");
const execa = require("execa");
const cli = path.resolve(__dirname, "../fe.js");

test("foreign Git location, index and object variables cannot redirect project initialization", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "fe-cli-foreign-git-"));
  try {
    const foreign = path.join(root, "foreign");
    const caller = path.join(root, "caller");
    fs.mkdirSync(foreign);
    fs.mkdirSync(caller);
    const config = path.join(root, "gitconfig");
    fs.writeFileSync(config, '[user]\nname=Git Isolation Test\nemail=isolation@example.invalid\n[commit]\ngpgSign=false\n');
    const env = { ...process.env, NODE_ENV: "test" };
    for (const key of Object.keys(env)) if (key.startsWith("GIT_")) delete env[key];
    Object.assign(env, { GIT_CONFIG_GLOBAL: config, GIT_CONFIG_NOSYSTEM: "1" });
    const git = (args, cwd = foreign) => execa("git", args, { cwd, env, extendEnv: false });
    await git(["init"]);
    fs.writeFileSync(path.join(foreign, "base"), "base");
    await git(["add", "."]);
    await git(["commit", "-m", "foreign base"]);
    fs.writeFileSync(path.join(foreign, "pending"), "unrelated staged work");
    await git(["add", "pending"]);
    const before = (await git(["rev-parse", "HEAD"])).stdout;
    const indexPath = path.join(foreign, ".git/index");
    const beforeIndex = fs.readFileSync(indexPath);
    const gitDirectory = path.join(foreign, ".git");
    await execa(process.execPath, [cli, "init", "demo", "-d", "--gitinit"], {
      cwd: caller, extendEnv: false,
      env: {
        ...env, GIT_DIR: gitDirectory, GIT_COMMON_DIR: gitDirectory, GIT_WORK_TREE: foreign,
        GIT_INDEX_FILE: indexPath, GIT_OBJECT_DIRECTORY: path.join(gitDirectory, "objects"),
        GIT_ALTERNATE_OBJECT_DIRECTORIES: path.join(gitDirectory, "objects"), GIT_PREFIX: "wrong-prefix/",
        GIT_CONFIG: path.join(gitDirectory, "config"), GIT_NAMESPACE: "foreign"
      }
    });
    const generated = path.join(caller, "demo");
    expect((await git(["rev-parse", "HEAD"])).stdout).toBe(before);
    expect(fs.readFileSync(indexPath).equals(beforeIndex)).toBe(true);
    expect((await git(["diff", "--cached", "--name-only"])).stdout).toBe("pending");
    expect(fs.statSync(path.join(generated, ".git")).isDirectory()).toBe(true);
    expect((await git(["rev-parse", "--show-toplevel"], generated)).stdout).toBe(fs.realpathSync(generated));
    expect((await git(["log", "-1", "--format=%an <%ae>"], generated)).stdout).toBe("Git Isolation Test <isolation@example.invalid>");
    expect((await git(["status", "--porcelain"], generated)).stdout).toBe("");
    expect((await git(["ls-files"], generated)).stdout).not.toContain("pending");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
