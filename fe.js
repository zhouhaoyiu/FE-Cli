#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
// const ejs = require("ejs");
// const copydir = require("copy-dir");
var src_1 = require("./src");
var package_json_1 = __importDefault(require("./package.json"));
var program = new commander_1.Command();
program.version(package_json_1["default"].version); // package.json 中的版本号
program
    .command("init <name>")
    // .description("Initialize a new project")
    .option("-d, --default", "Skip prompts and use default preset", false)
    .action(function (name, options) {
    var author = (0, src_1.getGitInfo)("author");
    console.log("Initializing a new project ".concat(name));
    console.log(options);
    if (options["default"]) {
        console.log("This is a default option");
    }
    if (fs_1["default"].existsSync(name)) {
        console.log("".concat(name, " already exists"));
    }
    else {
        fs_1["default"].mkdirSync(name);
        fs_1["default"].mkdirSync("".concat(name, "/src"));
        fs_1["default"].mkdirSync("".concat(name, "/test"));
        // 生成package.json
        var packageJson = (0, src_1.generatePackagejson)(name, author);
        fs_1["default"].writeFileSync("".concat(name, "/package.json"), JSON.stringify(packageJson, null, 2));
    }
});
program.parse(process.argv);
exports["default"] = program;
