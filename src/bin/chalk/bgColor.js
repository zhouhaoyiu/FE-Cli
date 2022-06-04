"use strict";
exports.__esModule = true;
function logWithBackGroundColor(color, message) {
    var logText = "";
    switch (color) {
        case "red":
            logText = "\x1b[41m%s\x1b[0m";
            break;
        case "green":
            logText = "\x1b[42m%s\x1b[0m";
            break;
        case "yellow":
            logText = "\x1b[43m%s\x1b[0m";
            break;
        case "blue":
            logText = "\x1b[44m%s\x1b[0m";
            break;
        case "magenta":
            logText = "\x1b[45m%s\x1b[0m";
            break;
        case "cyan":
            logText = "\x1b[46m%s\x1b[0m";
            break;
        case "white":
            logText = "\x1b[47m%s\x1b[0m";
            break;
        default:
            logText = void 0;
    }
    logText ? console.log(logText, message) : console.log(message);
    return logText;
}
exports["default"] = logWithBackGroundColor;
