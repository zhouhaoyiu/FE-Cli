const execa = require("execa");
const fs = require("fs");

const testDir = "testDir" + Math.random().toString(36).substring(2, 5);
const timeOut = 20000;

describe("index", () => {
  test("should work", () => {
    expect(true).toBe(true);
  });
  test(
    "test init",
    async () => {
      await execa("npm", ["link"]);
      await execa("fe", ["init", testDir, "-d", "-gi"]);

      expect(fs.existsSync(testDir)).toBe(true);
      expect(fs.existsSync(`${testDir}/package.json`)).toBe(true);
      expect(fs.existsSync(`${testDir}/src`)).toBe(true);
      expect(fs.existsSync(`${testDir}/src/index.js`)).toBe(true);
      expect(fs.existsSync(`${testDir}/test`)).toBe(true);
    },
    timeOut
  );
  afterAll(async () => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });
});
