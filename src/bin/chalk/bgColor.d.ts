declare function logWithBackGroundColor(color: Color, message: unknown): string | undefined;
export default logWithBackGroundColor;
type Color = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
