declare const supportFontStyle: readonly ["red", "green", "yellow", "blue", "magenta", "cyan", "white", "bold"];
declare type Color = typeof supportFontStyle[number];
declare function fontStyle(color: Color, message: any): void;
export default fontStyle;
