import logWithBackGroundColor from "../src/bin/chalk/bgColor";

describe("chalk", () => {
  test("print red background", () => {
    expect(logWithBackGroundColor("red", "red background")).toBe("\x1b[41m%s\x1b[0m");
  });
});
