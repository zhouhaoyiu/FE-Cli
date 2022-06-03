"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = require("fs");
var generatePackagejson_1 = __importDefault(require("../generatePackagejson"));
var utils_1 = require("./utils");
function generateDir(opt) {
    var _a = opt.projectName, projectName = _a === void 0 ? "test" : _a, author = opt.author, gitinit = opt.gitinit, isDefault = opt["default"], typescript = opt.typescript;
    (0, utils_1.checkProjectNameIsExist)(projectName);
    (0, fs_1.mkdirSync)(projectName);
    (0, fs_1.mkdirSync)("".concat(projectName, "/src"));
    (0, fs_1.writeFileSync)("".concat(projectName, "/src/main.").concat(typescript ? "ts" : "js"), "");
    (0, fs_1.mkdirSync)("".concat(projectName, "/test"));
    // 生成package.json
    var packageJson = (0, generatePackagejson_1["default"])(projectName, author);
    (0, fs_1.writeFileSync)("".concat(projectName, "/package.json"), JSON.stringify(packageJson, null, 2));
    /**
     * @zhouhaoyiu 2022-06-02 这个功能还没有完成
     */
    if (gitinit) {
        (0, utils_1.initGit)(projectName);
    }
}
exports["default"] = generateDir;
