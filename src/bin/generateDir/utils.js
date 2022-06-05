"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.checkProjectNameIsExistAndAskOverwrite = exports.initGit = exports.init = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var fs_1 = require("fs");
var run_1 = require("../../../utils/run");
var generatePackagejson_1 = __importDefault(require("./generatePackagejson"));
var tpl_1 = require("./tpl");
function init(_a) {
    var projectName = _a.projectName, description = _a.description, author = _a.author, version = _a.version, license = _a.license, gitinit = _a.gitinit, typescript = _a.typescript, eslint = _a.eslint;
    try {
        initRoot(projectName);
        initSrc(projectName, typescript);
        initTest(projectName);
        initPackageJson({ projectName: projectName, author: author, typescript: typescript, eslint: eslint, description: description, version: version, license: license });
        license && initLicense(projectName, license);
        typescript && initTsconfig(projectName);
        gitinit && initGit(projectName);
        return "init success";
    }
    catch (e) {
        return String(e);
    }
}
exports.init = init;
function initRoot(projectName) {
    (0, fs_1.mkdirSync)(projectName);
}
function initSrc(projectName, typescript) {
    (0, fs_1.mkdirSync)("".concat(projectName, "/src"));
    (0, fs_1.writeFileSync)("".concat(projectName, "/src/index.").concat(typescript ? "ts" : "js"), "");
    // 向生成的index文件中写入 console.log("hello world");
    if (typescript) {
        (0, fs_1.writeFileSync)("".concat(projectName, "/src/index.ts"), "console.log('hello world');");
    }
    else {
        (0, fs_1.writeFileSync)("".concat(projectName, "/src/index.js"), "console.log('hello world');");
    }
}
function initTest(projectName) {
    (0, fs_1.mkdirSync)("".concat(projectName, "/test"));
}
function initPackageJson(_a) {
    var projectName = _a.projectName, author = _a.author, typescript = _a.typescript, eslint = _a.eslint, description = _a.description, version = _a.version, license = _a.license;
    var packageJson = (0, generatePackagejson_1["default"])({ projectName: projectName, author: author, typescript: typescript, eslint: eslint, description: description, version: version, license: license });
    (0, fs_1.writeFileSync)("".concat(projectName, "/package.json"), JSON.stringify(packageJson, null, 2));
}
function initLicense(projectName, license) {
    (0, fs_1.writeFileSync)("".concat(projectName, "/LICENSE"), "".concat(license));
}
function initTsconfig(projectName) {
    (0, fs_1.writeFileSync)("".concat(projectName, "/tsconfig.json"), JSON.stringify(tpl_1.tsconfigTemplate));
}
/**
 * @deprecated 还没有完成
 * @param projectName 项目名称
 */
function initGit(projectName) {
    var _this = this;
    console.log(".git will be init");
    (0, fs_1.mkdirSync)("".concat(projectName, "/.gitignore"));
    // 在.gitignore中写入默认的忽略文件 当前是node_modules
    (0, fs_1.writeFileSync)("".concat(projectName, "/.gitignore"), "node_modules\n");
    (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, run_1.run)("cd", [projectName])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, run_1.run)("git", ["init"])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, run_1.run)("git", ["add", "."])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, run_1.run)("git", ["commit", "-m", "init"])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
}
exports.initGit = initGit;
/**
 * @zhouhaoyiu
 * @function 检查当前同名的项目是否存在
 * @param projectName 项目名称
 */
function checkProjectNameIsExistAndAskOverwrite(projectName) {
    return __awaiter(this, void 0, void 0, function () {
        var overwrite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, fs_1.existsSync)(projectName)) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer_1["default"].prompt([
                            {
                                type: "confirm",
                                name: "overwrite",
                                message: "".concat(projectName, " is exist, do you want to overwrite it?"),
                                "default": true
                            }
                        ])];
                case 1:
                    overwrite = _a.sent();
                    return [2 /*return*/, overwrite.overwrite];
                case 2: return [2 /*return*/, true];
            }
        });
    });
}
exports.checkProjectNameIsExistAndAskOverwrite = checkProjectNameIsExistAndAskOverwrite;
