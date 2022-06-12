"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.background = exports.font = void 0;
var fontStyle_1 = __importDefault(require("./fontStyle"));
var bgColor_1 = __importDefault(require("./bgColor"));
var font = /** @class */ (function () {
    function font() {
        return;
    }
    font.red = function (message) {
        (0, fontStyle_1["default"])("red", message);
    };
    font.green = function (message) {
        (0, fontStyle_1["default"])("green", message);
    };
    font.yellow = function (message) {
        (0, fontStyle_1["default"])("yellow", message);
    };
    font.blue = function (message) {
        (0, fontStyle_1["default"])("blue", message);
    };
    font.magenta = function (message) {
        (0, fontStyle_1["default"])("magenta", message);
    };
    font.cyan = function (message) {
        (0, fontStyle_1["default"])("cyan", message);
    };
    font.white = function (message) {
        (0, fontStyle_1["default"])("white", message);
    };
    font.bold = function (message) {
        (0, fontStyle_1["default"])("bold", message);
    };
    return font;
}());
exports.font = font;
var background = /** @class */ (function () {
    function background() {
        return;
    }
    background.red = function (message) {
        (0, bgColor_1["default"])("red", message);
    };
    background.green = function (message) {
        (0, bgColor_1["default"])("green", message);
    };
    background.yellow = function (message) {
        (0, bgColor_1["default"])("yellow", message);
    };
    background.blue = function (message) {
        (0, bgColor_1["default"])("blue", message);
    };
    background.magenta = function (message) {
        (0, bgColor_1["default"])("magenta", message);
    };
    background.cyan = function (message) {
        (0, bgColor_1["default"])("cyan", message);
    };
    background.white = function (message) {
        (0, bgColor_1["default"])("white", message);
    };
    return background;
}());
exports.background = background;
