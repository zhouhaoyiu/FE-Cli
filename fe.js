#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var commander_1 = require("commander");
var generateDir_1 = __importDefault(require("./src/bin/generateDir"));
var getGitInfo_1 = __importDefault(require("./src/bin/getGitInfo"));
var package_json_1 = __importDefault(require("./package.json")); // @ts-ignore
// 获得.env文件中的NODE_ENV的值
var environment = fs_1["default"].readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)[1];
var DEV = environment === "development";
var program = new commander_1.Command();
program.version(package_json_1["default"].version); // package.json 中的版本号
/**
 * @todoa add prompt and chalk
 */
program
    .command("init <name>")
    // .description("Initialize a new project")
    .option("-d, --default", "Skip prompts and use default preset", false)
    .option("-gi, --gitinit", "Initialize git repo", false)
    .option("-a, --author <author>", "Author username for git", false)
    .action(function (projectName, options) {
    var author = !options.author ? (0, getGitInfo_1["default"])("author") : options.author;
    //输出黄色字体
    console.log("\u001B[33m%s\u001B[0m", "Initializing ".concat(projectName));
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
