type Color = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "bold";
declare function fontStyle(color: Color, message: unknown): void;
export default fontStyle;
