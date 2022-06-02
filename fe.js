#!/usr/bin/env node
"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var commander_1 = require("commander");
var fs_1 = __importStar(require("fs"));
var execa_1 = __importDefault(require("execa"));
// const ejs = require("ejs");
// const copydir = require("copy-dir");
var src_1 = require("./src");
var package_json_1 = __importDefault(require("./package.json"));
var DEV = false;
var program = new commander_1.Command();
program.version(package_json_1["default"].version); // package.json 中的版本号
// TODO: 可以改成可以自定义的author信息,-a配置 (已经完成) 或者像vue-cli那样通过问题获取
program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Skip prompts and use default preset", false)
  .option("-gi, --gitinit", "Initialize git repo", false)
  .option("-a, --author <author>", "Author name for git", false)
  .action(function (name, options) {
    var author = !options.author
      ? (0, src_1.getGitInfo)("author")
      : options.author;
    console.log("Initializing a new project ".concat(name));
    if (DEV) {
      console.log(options);
      console.log(author);
    }
    // TODO 增加默认模板信息
    if (options["default"]) {
      console.log("This is a default option");
    }
    // 检测是否存在同名目录
    if (fs_1["default"].existsSync(name)) {
      console.log("".concat(name, " already exists. It will be overwritten."));
      // 删除文件夹
      fs_1["default"].rmSync(name, { recursive: true });
    }
    var opt = {
      name: name,
      author: author,
      gitinit: options.gitinit,
      default: options["default"]
    };
    generatedir(opt);
  });
function generatedir(opt) {
  var _this = this;
  var name = opt.name,
    author = opt.author,
    gitinit = opt.gitinit,
    isDefault = opt["default"];
  fs_1["default"].mkdirSync(name);
  fs_1["default"].mkdirSync("".concat(name, "/src"));
  fs_1["default"].mkdirSync("".concat(name, "/test"));
  // 生成package.json
  var packageJson = (0, src_1.generatePackagejson)(name, author);
  fs_1["default"].writeFileSync(
    "".concat(name, "/package.json"),
    JSON.stringify(packageJson, null, 2)
  );
  if (gitinit) {
    console.log(".git will be init");
    (0, fs_1.mkdirSync)("".concat(name, "/.gitignore"));
    // 在.gitignore中写入默认的忽略文件 当前是node_modules
    fs_1["default"].writeFileSync(
      "".concat(name, "/.gitignore"),
      "node_modules\n"
    );
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, run("cd", [name])];
            case 1:
              _a.sent();
              return [4 /*yield*/, run("git", ["init"])];
            case 2:
              _a.sent();
              return [4 /*yield*/, run("git", ["add", "."])];
            case 3:
              _a.sent();
              return [4 /*yield*/, run("git", ["commit", "-m", "init"])];
            case 4:
              _a.sent();
              return [2 /*return*/];
          }
        });
      });
    })();
  }
}
function run(command, args) {
  var _a;
  if (!args) {
    (_a = command.split(/\s+/)), (command = _a[0]), (args = _a.slice(1));
  }
  return (0, execa_1["default"])(command, args);
}
program.parse(process.argv);
exports["default"] = program;
