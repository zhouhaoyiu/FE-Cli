import logWithFontColor from "./fontColor";
import logWithBackGroundColor from "./bgColor";

class font {
  public static red(message: any) {
    logWithFontColor("red", message);
  }
  public static green(message: any) {
    logWithFontColor("green", message);
  }
  public static yellow(message: any) {
    logWithFontColor("yellow", message);
  }
  public static blue(message: any) {
    logWithFontColor("blue", message);
  }
  public static magenta(message: any) {
    logWithFontColor("magenta", message);
  }
  public static cyan(message: any) {
    logWithFontColor("cyan", message);
  }
  public static white(message: any) {
    logWithFontColor("white", message);
  }
  constructor() {
    return;
  }
}

class background {
  public static red(message: any) {
    logWithBackGroundColor("red", message);
  }
  public static green(message: any) {
    logWithBackGroundColor("green", message);
  }
  public static yellow(message: any) {
    logWithBackGroundColor("yellow", message);
  }
  public static blue(message: any) {
    logWithBackGroundColor("blue", message);
  }
  public static magenta(message: any) {
    logWithBackGroundColor("magenta", message);
  }
  public static cyan(message: any) {
    logWithBackGroundColor("cyan", message);
  }
  public static white(message: any) {
    logWithBackGroundColor("white", message);
  }
  constructor() {
    return;
  }
}

export { font, background };
