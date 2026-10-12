const fs = require("fs");
const os = require("os");
const path = require("path");
const execa = require("execa");
const cli = path.resolve(__dirname, "../fe.js");
let root;
beforeAll(() => { root = fs.mkdtempSync(path.join(os.tmpdir(), "fe-cli-licenses-")); });
afterAll(() => fs.rmSync(root, { recursive: true, force: true }));

test.each([
  ["MIT", "Permission is hereby granted", "THE SOFTWARE IS PROVIDED"],
  ["Apache-2.0", "TERMS AND CONDITIONS", "END OF TERMS AND CONDITIONS"],
  ["GPL-3.0-only", "GNU GENERAL PUBLIC LICENSE", "How to Apply These Terms"],
  ["BSD-3-Clause", "Redistribution and use", "NEGLIGENCE OR OTHERWISE"],
  ["ISC", "Permission to use, copy, modify", "THE SOFTWARE IS PROVIDED"]
])("%s generates the complete license with matching package metadata", async (license, opening, ending) => {
  const name = license.toLowerCase().replaceAll(".", "-");
  await execa(process.execPath, [cli, "init", name, "-d", "--license", license, "--author", "License Test"], { cwd: root });
  const text = fs.readFileSync(path.join(root, name, "LICENSE"), "utf8");
  const pkg = JSON.parse(fs.readFileSync(path.join(root, name, "package.json"), "utf8"));
  expect(pkg.license).toBe(license);
  expect(text.length).toBeGreaterThan(600);
  expect(text).toContain(opening);
  expect(text).toContain(ending);
  if (["MIT", "BSD-3-Clause", "ISC"].includes(license)) {
    expect(text).toContain(String(new Date().getFullYear()));
    expect(text).toContain("License Test");
    expect(text).not.toMatch(/<year>|<owner>|<copyright holders>/);
    expect(text).not.toContain("FE-WORLD-TEAM");
  }
});

test("unsupported or ambiguous license names fail before creating files", async () => {
  for (const license of ["GPL", "Apache", "BSD", "../outside"]) {
    const result = await execa(process.execPath, [cli, "init", "invalid", "-d", "--license", license], { cwd: root, reject: false });
    expect(result.code).toBe(1);
    expect(result.stderr).toContain("Unsupported license");
    expect(fs.existsSync(path.join(root, "invalid"))).toBe(false);
  }
});

test("omitting a license does not generate a misleading LICENSE file", async () => {
  await execa(process.execPath, [cli, "init", "skip", "-d"], { cwd: root });
  expect(fs.existsSync(path.join(root, "skip/LICENSE"))).toBe(false);
});
