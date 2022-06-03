"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.run = void 0;
var execa_1 = __importDefault(require("execa"));
function run(command, args) {
    var _a;
    if (!args) {
        _a = command.split(/\s+/), command = _a[0], args = _a.slice(1);
    }
    return (0, execa_1["default"])(command, args);
}
exports.run = run;
