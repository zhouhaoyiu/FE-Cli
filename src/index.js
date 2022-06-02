"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
exports.getGitInfo = exports.generatePackagejson = void 0;
var generatePackagejson_1 = __importDefault(require("./bin/generatePackagejson"));
exports.generatePackagejson = generatePackagejson_1["default"];
var getGinInfo_1 = __importDefault(require("./bin/getGinInfo"));
exports.getGitInfo = getGinInfo_1["default"];
