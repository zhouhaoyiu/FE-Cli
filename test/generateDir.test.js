const fs = require("fs");
const os = require("os");
const path = require("path");
const inquirer = require("inquirer");
const generateDir = require("../src/bin/generateDir").default;

const options = { ...require("../utils/preset").default, projectName: "demo", author: "Test" };
let root;
let originalCwd;

beforeEach(() => {
  originalCwd = process.cwd();
  root = fs.mkdtempSync(path.join(os.tmpdir(), "fe-cli-write-tests-"));
  process.chdir(root);
});

afterEach(() => {
  jest.restoreAllMocks();
  process.chdir(originalCwd);
  fs.rmSync(root, { recursive: true, force: true });
});

test("filesystem write failures propagate without reporting success or leaving a project", async () => {
  const log = jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(fs, "writeFileSync").mockImplementationOnce(() => {
    throw new Error("disk write failed");
  });
  await expect(generateDir({ ...options })).rejects.toThrow("disk write failed");
  expect(fs.readdirSync(root)).toEqual([]);
  expect(log.mock.calls.flat().join(" ")).not.toContain("success created");
});

test("failure to publish the replacement restores the old project", async () => {
  fs.mkdirSync("demo");
  fs.writeFileSync("demo/sentinel", "original");
  jest.spyOn(inquirer, "prompt").mockResolvedValue({ overwrite: true });
  const rename = fs.renameSync;
  jest.spyOn(fs, "renameSync").mockImplementation((source, target) => {
    if (path.basename(source) === "generated-project") throw new Error("rename failed");
    return rename(source, target);
  });
  await expect(generateDir({ ...options })).rejects.toThrow("rename failed");
  expect(fs.readFileSync("demo/sentinel", "utf8")).toBe("original");
  expect(fs.readdirSync(root)).toEqual(["demo"]);
});

test("a failed rollback preserves the backup and reports its location", async () => {
  fs.mkdirSync("demo");
  fs.writeFileSync("demo/sentinel", "original");
  jest.spyOn(inquirer, "prompt").mockResolvedValue({ overwrite: true });
  const rename = fs.renameSync;
  jest.spyOn(fs, "renameSync").mockImplementation((source, target) => {
    if (["generated-project", "previous-project"].includes(path.basename(source))) throw new Error("rename failed");
    return rename(source, target);
  });
  await expect(generateDir({ ...options })).rejects.toThrow("Its backup is at");
  const staging = fs.readdirSync(root).find(name => name.startsWith(".fe-cli-"));
  expect(fs.readFileSync(path.join(staging, "previous-project/sentinel"), "utf8")).toBe("original");
});
