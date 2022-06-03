#!/usr/bin/env node
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
define("src/bin/generatePackagejson/index", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function generatePackagejson(name, author) {
        if (author === void 0) { author = ""; }
        var packagejson = {
            name: name,
            version: "0.0.1",
            description: "",
            main: "index.js",
            author: author,
            scripts: {
                test: 'echo "Error: no test specified" && exit 1'
            },
            keywords: [],
            dependencies: {},
            devDependencies: {}
        };
        return packagejson;
    }
    exports["default"] = generatePackagejson;
});
define("src/bin/getGinInfo/index", ["require", "exports", "fs", "os", "path"], function (require, exports, fs_1, os_1, path_1) {
    "use strict";
    exports.__esModule = true;
    fs_1 = __importDefault(fs_1);
    os_1 = __importDefault(os_1);
    path_1 = __importDefault(path_1);
    function getGitInfo(opt) {
        // 获得本地git中配置的用户名和邮箱
        var configPath = path_1["default"].join(os_1["default"].homedir(), ".gitconfig");
        var config = fs_1["default"].existsSync(configPath) ? fs_1["default"].readFileSync(configPath, "utf-8") : "";
        var name = "noname";
        var email = "noemail";
        if (config.match(/name = (.*)/) && config.match(/name = (.*)/).length > 1) {
            name = config.match(/name = (.*)/)[1];
        }
        if (config.match(/email = (.*)/) && config.match(/email = (.*)/).length > 1) {
            email = config.match(/email = (.*)/)[1];
        }
        var author = name && email ? "".concat(name, " <").concat(email, ">") : "";
        switch (opt) {
            case "name":
                return name;
            case "email":
                return email;
            case "author":
                return author;
            case "config":
                return config;
        }
    }
    exports["default"] = getGitInfo;
});
define("src/index", ["require", "exports", "src/bin/generatePackagejson/index", "src/bin/getGinInfo/index"], function (require, exports, generatePackagejson_1, getGinInfo_1) {
    "use strict";
    exports.__esModule = true;
    exports.getGitInfo = exports.generatePackagejson = void 0;
    generatePackagejson_1 = __importDefault(generatePackagejson_1);
    getGinInfo_1 = __importDefault(getGinInfo_1);
    exports.generatePackagejson = generatePackagejson_1["default"];
    exports.getGitInfo = getGinInfo_1["default"];
});
define("package", [], {
    "name": "fe-cli",
    "version": "0.0.1",
    "main": "index.js",
    "repository": "https://github.com/FE-WROLD-TEAM/FE-Cli.git",
    "author": "zhouhaoyu <67226385+zhouhaoyiu@users.noreply.github.com>",
    "license": "MIT",
    "type": "commonjs",
    "scripts": {
        "dev": "cross-env NODE_ENV=development node env.mjs && tsc fe.ts -d -w --resolveJsonModule --esModuleInterop --outFile index.js --module amd --moduleResolution node",
        "prod": "cross-env NODE_ENV=production node env.mjs && tsc fe.ts -d -w --resolveJsonModule --esModuleInterop --outFile index.js --module amd --moduleResolution node",
        "prod:test": "cross-env NODE_ENV=production node env.mjs && tsc fe.ts --resolveJsonModule --esModuleInterop --outFile index.js --module amd --moduleResolution node",
        "format": "prettier --write **/*.ts --ignore-path .prettierignore",
        "update": "node ./version.js",
        "test": "jest",
        "build": "cross-env NODE_ENV=production node env.mjs && tsc fe.ts -d --resolveJsonModule --esModuleInterop --outFile index.js --module amd --moduleResolution node && prettier --write **/*.ts --ignore-path .prettierignore ",
        "prepare": "npx husky install && npx husky add .husky/pre-commit 'npm run lint-staged'",
        "lint-staged": "lint-staged --allow-empty"
    },
    "bin": {
        "fe": "fe.js"
    },
    "lint-staged": {
        "*.ts": [
            "prettier --write **/*.ts --ignore-path .prettierignore"
        ]
    },
    "dependencies": {
        "commander": "^9.3.0",
        "copy-dir": "^1.3.0",
        "dayjs": "^1.11.2",
        "ejs": "^3.1.2",
        "execa": "^1.0.0",
        "slash": "^4.0.0"
    },
    "devDependencies": {
        "@types/jest": "^28.1.0",
        "@types/node": "^17.0.38",
        "cross-env": "^7.0.3",
        "husky": "^8.0.1",
        "jest": "^28.1.0",
        "lint-staged": "^13.0.0",
        "prettier": "^2.6.2",
        "ts-jest": "^28.0.3",
        "typescript": "^4.7.2"
    }
});
define("utils/run", ["require", "exports", "execa"], function (require, exports, execa_1) {
    "use strict";
    exports.__esModule = true;
    exports.run = void 0;
    execa_1 = __importDefault(execa_1);
    function run(command, args) {
        var _a;
        if (!args) {
            _a = command.split(/\s+/), command = _a[0], args = _a.slice(1);
        }
        return (0, execa_1["default"])(command, args);
    }
    exports.run = run;
});
define("src/bin/generateDir/utils", ["require", "exports", "fs", "utils/run"], function (require, exports, fs_2, run_1) {
    "use strict";
    exports.__esModule = true;
    exports.checkProjectNameIsExist = exports.initGit = void 0;
    /**
     * @deprecated 还没有完成
     * @param projectName 项目名称
     */
    function initGit(projectName) {
        var _this = this;
        console.log(".git will be init");
        (0, fs_2.mkdirSync)("".concat(projectName, "/.gitignore"));
        // 在.gitignore中写入默认的忽略文件 当前是node_modules
        (0, fs_2.writeFileSync)("".concat(projectName, "/.gitignore"), "node_modules\n");
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
    function checkProjectNameIsExist(projectName) {
        if ((0, fs_2.existsSync)(projectName)) {
            console.log("".concat(projectName, " already exists. It will be overwritten."));
            // 删除文件夹
            (0, fs_2.rmSync)(projectName, { recursive: true });
        }
    }
    exports.checkProjectNameIsExist = checkProjectNameIsExist;
});
define("src/bin/generateDir/index", ["require", "exports", "fs", "src/bin/generatePackagejson/index", "src/bin/generateDir/utils"], function (require, exports, fs_3, generatePackagejson_2, utils_1) {
    "use strict";
    exports.__esModule = true;
    generatePackagejson_2 = __importDefault(generatePackagejson_2);
    function generateDir(opt) {
        var projectName = opt.projectName, author = opt.author, gitinit = opt.gitinit, isDefault = opt["default"];
        (0, utils_1.checkProjectNameIsExist)(projectName);
        (0, fs_3.mkdirSync)(projectName);
        (0, fs_3.mkdirSync)("".concat(projectName, "/src"));
        (0, fs_3.mkdirSync)("".concat(projectName, "/test"));
        // 生成package.json
        var packageJson = (0, generatePackagejson_2["default"])(projectName, author);
        (0, fs_3.writeFileSync)("".concat(projectName, "/package.json"), JSON.stringify(packageJson, null, 2));
        /**
         * @zhouhaoyiu 2022-06-02 这个功能还没有完成
         */
        if (gitinit) {
            (0, utils_1.initGit)(projectName);
        }
    }
    exports["default"] = generateDir;
});
define("fe", ["require", "exports", "commander", "fs", "src/index", "package", "src/bin/generateDir/index"], function (require, exports, commander_1, fs_4, src_1, package_json_1, generateDir_1) {
    "use strict";
    exports.__esModule = true;
    package_json_1 = __importDefault(package_json_1);
    generateDir_1 = __importDefault(generateDir_1);
    // 获得.env文件中的NODE_ENV的值
    var environment = (0, fs_4.readFileSync)(".env", "utf-8").match(/NODE_ENV=(.*)/)[1];
    var DEV = environment === "development";
    var program = new commander_1.Command();
    program.version(package_json_1["default"].version); // package.json 中的版本号
    /**
     * @todo 可以改成可以自定义的author信息,-a配置 (已经完成) 或者像vue-cli那样通过问题获取
     */
    program
        .command("init <name>")
        // .description("Initialize a new project")
        .option("-d, --default", "Skip prompts and use default preset", false)
        .option("-gi, --gitinit", "Initialize git repo", false)
        .option("-a, --author <author>", "Author username for git", false)
        .action(function (projectName, options) {
        var author = !options.author ? (0, src_1.getGitInfo)("author") : options.author;
        console.log("Initializing a new project ".concat(projectName));
        if (DEV) {
            console.log(options);
            console.log(author);
        }
        // TODO 增加默认模板信息
        if (options["default"]) {
            console.log("This is a default option");
        }
        var opt = {
            projectName: projectName,
            author: author,
            gitinit: options.gitinit,
            "default": options["default"]
        };
        (0, generateDir_1["default"])(opt);
    });
    program.parse(process.argv);
    exports["default"] = program;
});
