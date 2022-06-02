"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getGitInfo = exports.generatePackagejson = void 0;
var generatePackagejson_1 = __importDefault(require("./bin/generatePackagejson"));
exports.generatePackagejson = generatePackagejson_1["default"];
var getGitInfo_1 = __importDefault(require("./bin/getGitInfo"));
exports.getGitInfo = getGitInfo_1["default"];
