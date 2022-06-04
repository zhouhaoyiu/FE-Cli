import execa from "execa";
import fs from "fs";
import { s2ms } from "../utils/timeConversion";

const testDir: string = "testDir";
const timeOut: number = s2ms("20s");

describe("index", () => {
  test("should work", () => {
    expect(true).toBe(true);
  });
  test(
    "test init",
    async () => {
      // 执行 npm link
      await execa("npm", ["link"]);
      // 执行 fe init testDir
      await execa("fe", ["init", testDir, "-d"]);

      // 判断文件夹是否存在
      expect(fs.existsSync(testDir)).toBe(true);
      // 判断package.json是否存在
      expect(fs.existsSync(`${testDir}/package.json`)).toBe(true);
      // 判断src是否存在
      expect(fs.existsSync(`${testDir}/src`)).toBe(true);
      // 判断src/main.js是否存在
      expect(fs.existsSync(`${testDir}/src/main.js`)).toBe(true);
      // 判断test是否存在
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
