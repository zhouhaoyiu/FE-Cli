"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.background = exports.font = void 0;
const fontStyle_1 = __importDefault(require("./fontStyle"));
const bgColor_1 = __importDefault(require("./bgColor"));
class font {
    static red(message) {
        (0, fontStyle_1.default)("red", message);
    }
    static green(message) {
        (0, fontStyle_1.default)("green", message);
    }
    static yellow(message) {
        (0, fontStyle_1.default)("yellow", message);
    }
    static blue(message) {
        (0, fontStyle_1.default)("blue", message);
    }
    static magenta(message) {
        (0, fontStyle_1.default)("magenta", message);
    }
    static cyan(message) {
        (0, fontStyle_1.default)("cyan", message);
    }
    static white(message) {
        (0, fontStyle_1.default)("white", message);
    }
    static bold(message) {
        (0, fontStyle_1.default)("bold", message);
    }
    constructor() {
        return;
    }
}
exports.font = font;
class background {
    static red(message) {
        (0, bgColor_1.default)("red", message);
    }
    static green(message) {
        (0, bgColor_1.default)("green", message);
    }
    static yellow(message) {
        (0, bgColor_1.default)("yellow", message);
    }
    static blue(message) {
        (0, bgColor_1.default)("blue", message);
    }
    static magenta(message) {
        (0, bgColor_1.default)("magenta", message);
    }
    static cyan(message) {
        (0, bgColor_1.default)("cyan", message);
    }
    static white(message) {
        (0, bgColor_1.default)("white", message);
    }
    constructor() {
        return;
    }
}
exports.background = background;
