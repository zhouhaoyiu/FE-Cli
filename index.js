#!/usr/bin/env node
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
System.register("src/bin/generatePackagejson/index", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    return {
        setters: [],
        execute: function () {
            exports_1("default", generatePackagejson);
        }
    };
});
System.register("src/bin/getGinInfo/index", ["fs", "os", "path"], function (exports_2, context_2) {
    "use strict";
    var fs_1, os_1, path_1;
    var __moduleName = context_2 && context_2.id;
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
    return {
        setters: [
            function (fs_1_1) {
                fs_1 = fs_1_1;
            },
            function (os_1_1) {
                os_1 = os_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            }
        ],
        execute: function () {
            exports_2("default", getGitInfo);
        }
    };
});
System.register("src/index", ["src/bin/generatePackagejson/index", "src/bin/getGinInfo/index"], function (exports_3, context_3) {
    "use strict";
    var generatePackagejson_1, getGinInfo_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (generatePackagejson_1_1) {
                generatePackagejson_1 = generatePackagejson_1_1;
            },
            function (getGinInfo_1_1) {
                getGinInfo_1 = getGinInfo_1_1;
            }
        ],
        execute: function () {
            exports_3("generatePackagejson", generatePackagejson_1["default"]);
            exports_3("getGitInfo", getGinInfo_1["default"]);
        }
    };
});
System.register("utils/run", ["execa"], function (exports_4, context_4) {
    "use strict";
    var execa_1;
    var __moduleName = context_4 && context_4.id;
    function run(command, args) {
        var _a;
        if (!args) {
            _a = command.split(/\s+/), command = _a[0], args = _a.slice(1);
        }
        return execa_1["default"](command, args);
    }
    exports_4("run", run);
    return {
        setters: [
            function (execa_1_1) {
                execa_1 = execa_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/bin/generateDir/utils", ["fs", "utils/run"], function (exports_5, context_5) {
    "use strict";
    var fs_2, run_1;
    var __moduleName = context_5 && context_5.id;
    /**
     * @deprecated 还没有完成
     * @param projectName 项目名称
     */
    function initGit(projectName) {
        var _this = this;
        console.log(".git will be init");
        fs_2.mkdirSync("".concat(projectName, "/.gitignore"));
        // 在.gitignore中写入默认的忽略文件 当前是node_modules
        fs_2.writeFileSync("".concat(projectName, "/.gitignore"), "node_modules\n");
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, run_1.run("cd", [projectName])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, run_1.run("git", ["init"])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, run_1.run("git", ["add", "."])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, run_1.run("git", ["commit", "-m", "init"])];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    exports_5("initGit", initGit);
    /**
     * @zhouhaoyiu
     * @function 检查当前同名的项目是否存在
     * @param projectName 项目名称
     */
    function checkProjectNameIsExist(projectName) {
        if (fs_2.existsSync(projectName)) {
            console.log("".concat(projectName, " already exists. It will be overwritten."));
            // 删除文件夹
            fs_2.rmSync(projectName, { recursive: true });
        }
    }
    exports_5("checkProjectNameIsExist", checkProjectNameIsExist);
    return {
        setters: [
            function (fs_2_1) {
                fs_2 = fs_2_1;
            },
            function (run_1_1) {
                run_1 = run_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/bin/generateDir/index", ["fs", "src/bin/generatePackagejson/index", "src/bin/generateDir/utils"], function (exports_6, context_6) {
    "use strict";
    var fs_3, generatePackagejson_2, utils_1;
    var __moduleName = context_6 && context_6.id;
    function generateDir(opt) {
        var projectName = opt.projectName, author = opt.author, gitinit = opt.gitinit, isDefault = opt["default"];
        utils_1.checkProjectNameIsExist(projectName);
        fs_3.mkdirSync(projectName);
        fs_3.mkdirSync("".concat(projectName, "/src"));
        fs_3.mkdirSync("".concat(projectName, "/test"));
        // 生成package.json
        var packageJson = generatePackagejson_2["default"](projectName, author);
        fs_3.writeFileSync("".concat(projectName, "/package.json"), JSON.stringify(packageJson, null, 2));
        /**
         * @zhouhaoyiu 2022-06-02 这个功能还没有完成
         */
        if (gitinit) {
            utils_1.initGit(projectName);
        }
    }
    return {
        setters: [
            function (fs_3_1) {
                fs_3 = fs_3_1;
            },
            function (generatePackagejson_2_1) {
                generatePackagejson_2 = generatePackagejson_2_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_6("default", generateDir);
        }
    };
});
System.register("fe", ["commander", "fs", "src/index", "src/bin/generateDir/index"], function (exports_7, context_7) {
    "use strict";
    var commander_1, fs_4, src_1, generateDir_1, environment, DEV, program, _package;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (commander_1_1) {
                commander_1 = commander_1_1;
            },
            function (fs_4_1) {
                fs_4 = fs_4_1;
            },
            function (src_1_1) {
                src_1 = src_1_1;
            },
            function (generateDir_1_1) {
                generateDir_1 = generateDir_1_1;
            }
        ],
        execute: function () {
            // 获得.env文件中的NODE_ENV的值
            environment = fs_4.readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)[1];
            DEV = environment === "development";
            program = new commander_1.Command();
            _package = require("../package.json");
            program.version(_package.version); // package.json 中的版本号
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
                var author = !options.author ? src_1.getGitInfo("author") : options.author;
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
                generateDir_1["default"](opt);
            });
            program.parse(process.argv);
            exports_7("default", program);
        }
    };
});
