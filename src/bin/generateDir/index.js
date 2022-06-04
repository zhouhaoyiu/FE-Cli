"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = require("fs");
var index_1 = require("../chalk/index");
var generatePackagejson_1 = __importDefault(require("../generatePackagejson"));
var utils_1 = require("./utils");
function generateDir(opt) {
    var projectName = opt.projectName, description = opt.description, author = opt.author, version = opt.version, license = opt.license, gitinit = opt.gitinit, typescript = opt.typescript, eslint = opt.eslint;
    index_1.font.yellow("Initializing Project ".concat(projectName));
    if (!projectName) {
        projectName = "unnameProject";
    }
    (0, utils_1.checkProjectNameIsExist)(projectName);
    (0, fs_1.mkdirSync)(projectName);
    (0, fs_1.mkdirSync)("".concat(projectName, "/src"));
    (0, fs_1.writeFileSync)("".concat(projectName, "/src/main.").concat(typescript ? "ts" : "js"), "");
    (0, fs_1.mkdirSync)("".concat(projectName, "/test"));
    // 生成package.json
    var packageJson = (0, generatePackagejson_1["default"])({ projectName: projectName, author: author, typescript: typescript, eslint: eslint, description: description, version: version, license: license });
    (0, fs_1.writeFileSync)("".concat(projectName, "/package.json"), JSON.stringify(packageJson, null, 2));
    if (typescript) {
        (0, fs_1.writeFileSync)("".concat(projectName, "/tsconfig.json"), "{}");
    }
    /**
     * @zhouhaoyiu 2022-06-02 这个功能还没有完成
     */
    if (gitinit) {
        (0, utils_1.initGit)(projectName);
    }
    index_1.font.green("".concat(projectName, " is success created"));
}
exports["default"] = generateDir;
