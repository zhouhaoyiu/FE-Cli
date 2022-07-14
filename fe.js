#!/usr/bin/env node
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
var fs_1 = __importDefault(require("fs"));
var commander_1 = require("commander");
var inquirer_1 = __importDefault(require("inquirer"));
var generateDir_1 = __importDefault(require("./src/bin/generateDir"));
var getGitInfo_1 = __importDefault(require("./src/bin/getGitInfo"));
var package_json_1 = __importDefault(require("./package.json"));
var preset_1 = __importDefault(require("./utils/preset"));
var index_1 = require("./src/bin/chalk/index");
var promptInfo_1 = require("./utils/promptInfo");
var DEV = false;
// 获得.env文件中的NODE_ENV的值
if (fs_1["default"].existsSync(".env")) {
    var environment = fs_1["default"].readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)[1];
    DEV = environment === "development";
}
var program = new commander_1.Command();
var validProjectName = /^[a-zA-Z0-9_]+$/;
function getValidProjectName(name) {
    if (!validProjectName.test(name)) {
        console.log(index_1.font.red("\u9879\u76EE\u540D\u79F0\u4E0D\u5408\u6CD5\uFF0C\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF"));
        return name.replace(/[^a-zA-Z0-9_]/g, "");
    }
    return name;
}
program.version(package_json_1["default"].version); // package.json 中的版本号
program
    .command("init <name>")
    // .description("Initialize a new project")
    .option("-d, --default", "Skip prompts and use default preset", false)
    .option("-gi, --gitinit", "Initialize git repo", false)
    .option("-a, --author <author>", "Author username for git", false)
    .option("-t, --template <template>", "Template name", "js")
    .action(function (projectName, options) { return __awaiter(void 0, void 0, void 0, function () {
    var author, info, _i, _a, key, dependencies, dependenciesArr;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                author = (options.author ? options.author : (0, getGitInfo_1["default"])("author")) || "";
                projectName = getValidProjectName(projectName);
                if (!options["default"]) return [3 /*break*/, 2];
                index_1.font.blue("You are using the default preset.");
                preset_1["default"].author = author;
                preset_1["default"].projectName = projectName;
                preset_1["default"].gitinit = options.gitinit;
                return [4 /*yield*/, (0, generateDir_1["default"])(preset_1["default"])];
            case 1:
                _b.sent();
                return [2 /*return*/];
            case 2:
                if (options.template) {
                    switch (options.template) {
                        case "js":
                            void 0;
                            break;
                        case "ts":
                            void 0;
                            break;
                        case "react":
                            void 0;
                            break;
                        case "vue2":
                            void 0;
                            break;
                        case "vue3":
                            void 0;
                            break;
                        default:
                            index_1.font.red("Template not found.");
                            break;
                    }
                    return [2 /*return*/];
                }
                return [4 /*yield*/, inquirer_1["default"].prompt((0, promptInfo_1.projectInfo)(projectName, author))];
            case 3:
                info = _b.sent();
                for (_i = 0, _a = Object.keys(info); _i < _a.length; _i++) {
                    key = _a[_i];
                    // @ts-ignore
                    preset_1["default"][key] = info[key];
                }
                return [4 /*yield*/, inquirer_1["default"].prompt((0, promptInfo_1.dependenciesInfo)({
                        typescript: preset_1["default"].typescript,
                        eslint: preset_1["default"].eslint
                    }))];
            case 4:
                dependencies = _b.sent();
                dependenciesArr = dependencies.dependencies;
                preset_1["default"].typescript = dependenciesArr.includes("typescript");
                preset_1["default"].eslint = dependenciesArr.includes("eslint");
                DEV && console.log(preset_1["default"]);
                return [4 /*yield*/, (0, generateDir_1["default"])(preset_1["default"])];
            case 5:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
program
    .command("help")
    .description("Show help")
    .action(function () {
    program.help();
});
program
    .command("test")
    .description("Run tests")
    .action(function () {
    console.log("test");
});
program
    .command("info")
    .description("print debugging information about your environment")
    .action(function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index_1.font.bold("\nEnvironment Info:");
                return [4 /*yield*/, require("envinfo").run({
                        System: ["OS", "CPU"],
                        Binaries: ["Node", "Yarn", "npm"],
                        Browsers: ["Chrome", "Edge", "Firefox", "Safari"]
                    }, {
                        showNotFound: true,
                        duplicates: true,
                        fullTree: true,
                        showBundled: true
                    })];
            case 1:
                res = _a.sent();
                console.log(res);
                return [2 /*return*/];
        }
    });
}); });
program.command("template").action(function () {
    console.log("-----template-------");
    console.log("js");
    console.log("ts");
    console.log("react");
    console.log("vue2");
    console.log("vue3");
});
program.command("*").action(function () {
    console.log("Invalid command");
    program.help();
});
var 帅哥 = /** @class */ (function () {
    function 帅哥() {
        this.身高 = 185;
        this.年龄 = 20;
    }
    return 帅哥;
}());
var 对象 = new 帅哥();
program.parse(process.argv);
exports["default"] = program;
