"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const execa_1 = __importDefault(require("execa"));
function run(command, args) {
    if (!args) {
        [command, ...args] = command.split(/\s+/);
    }
    return (0, execa_1.default)(command, args);
}
