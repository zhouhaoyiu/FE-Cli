"use strict";
exports.__esModule = true;
var supportFontStyle = ["red", "green", "yellow", "blue", "magenta", "cyan", "white", "bold"];
function fontStyle(color, message) {
    switch (color) {
        case "red":
            console.log("\x1b[31m%s\x1b[0m", message);
            break;
        case "green":
            console.log("\x1b[32m%s\x1b[0m", message);
            break;
        case "yellow":
            console.log("\x1b[33m%s\x1b[0m", message);
            break;
        case "blue":
            console.log("\x1b[34m%s\x1b[0m", message);
            break;
        case "magenta":
            console.log("\x1b[35m%s\x1b[0m", message);
            break;
        case "cyan":
            console.log("\x1b[36m%s\x1b[0m", message);
            break;
        case "white":
            console.log("\x1b[37m%s\x1b[0m", message);
            break;
        case "bold":
            console.log("\x1b[1m%s\x1b[0m", message);
            break;
        default:
            console.log(message);
    }
}
exports["default"] = fontStyle;
