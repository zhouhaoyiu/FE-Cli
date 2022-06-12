import fontStyle from "./fontStyle";
import logWithBackGroundColor from "./bgColor";

class font {
  public static red(message: string) {
    fontStyle("red", message);
  }
  public static green(message: string) {
    fontStyle("green", message);
  }
  public static yellow(message: string) {
    fontStyle("yellow", message);
  }
  public static blue(message: string) {
    fontStyle("blue", message);
  }
  public static magenta(message: string) {
    fontStyle("magenta", message);
  }
  public static cyan(message: string) {
    fontStyle("cyan", message);
  }
  public static white(message: string) {
    fontStyle("white", message);
  }
  public static bold(message: string) {
    fontStyle("bold", message);
  }
  constructor() {
    return;
  }
}

class background {
  public static red(message: string) {
    logWithBackGroundColor("red", message);
  }
  public static green(message: string) {
    logWithBackGroundColor("green", message);
  }
  public static yellow(message: string) {
    logWithBackGroundColor("yellow", message);
  }
  public static blue(message: string) {
    logWithBackGroundColor("blue", message);
  }
  public static magenta(message: string) {
    logWithBackGroundColor("magenta", message);
  }
  public static cyan(message: string) {
    logWithBackGroundColor("cyan", message);
  }
  public static white(message: string) {
    logWithBackGroundColor("white", message);
  }
  constructor() {
    return;
  }
}

export { font, background };
