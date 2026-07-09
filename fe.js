#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const generateDir_1 = __importDefault(require("./src/bin/generateDir"));
const getGitInfo_1 = __importDefault(require("./src/bin/getGitInfo"));
const package_json_1 = __importDefault(require("./package.json"));
const preset_1 = __importDefault(require("./utils/preset"));
const index_1 = require("./src/bin/chalk/index");
const promptInfo_1 = require("./utils/promptInfo");
let DEV = false;
// 获得.env文件中的NODE_ENV的值
if (fs_1.default.existsSync(".env")) {
    const environment = fs_1.default.readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)[1];
    DEV = environment === "development";
}
const program = new commander_1.Command();
process.argv = process.argv.map((arg) => (arg === "-gi" ? "--gitinit" : arg));
const validProjectName = /^[a-zA-Z0-9_]+$/;
function getValidProjectName(name) {
    if (!validProjectName.test(name)) {
        console.log(index_1.font.red(`项目名称不合法，只能包含字母、数字、下划线`));
        return name.replace(/[^a-zA-Z0-9_]/g, "");
    }
    return name;
}
program.version(package_json_1.default.version);
program
    .command("init <name>")
    // .description("Initialize a new project")
    .option("-d, --default", "Skip prompts and use default preset", false)
    .option("-g, --gitinit", "Initialize git repo", false)
    .option("-a, --author <author>", "Author username for git", false)
    .option("-t, --template <template>", "Template name", "js")
    .action(async (projectName, options) => {
    const author = (options.author ? options.author : (0, getGitInfo_1.default)("author")) || "";
    projectName = getValidProjectName(projectName);
    if (options.default) {
        index_1.font.blue("You are using the default preset.");
        preset_1.default.author = author;
        preset_1.default.projectName = projectName;
        preset_1.default.gitinit = options.gitinit;
        await (0, generateDir_1.default)(preset_1.default);
        return;
    }
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
        return;
    }
    const info = await inquirer_1.default.prompt((0, promptInfo_1.projectInfo)(projectName, author));
    for (const key of Object.keys(info)) {
        // @ts-ignore
        preset_1.default[key] = info[key];
    }
    const dependencies = await inquirer_1.default.prompt((0, promptInfo_1.dependenciesInfo)({
        typescript: preset_1.default.typescript,
        eslint: preset_1.default.eslint
    }));
    const dependenciesArr = dependencies.dependencies;
    preset_1.default.typescript = dependenciesArr.includes("typescript");
    preset_1.default.eslint = dependenciesArr.includes("eslint");
    DEV && console.log(preset_1.default);
    await (0, generateDir_1.default)(preset_1.default);
});
program
    .command("help")
    .description("Show help")
    .action(() => {
    program.help();
});
program
    .command("test")
    .description("Run tests")
    .action(() => {
    console.log("test");
});
program
    .command("info")
    .description("print debugging information about your environment")
    .action(async (cmd) => {
    index_1.font.bold("\nEnvironment Info:");
    const res = await require("envinfo").run({
        System: ["OS", "CPU"],
        Binaries: ["Node", "Yarn", "npm"],
        Browsers: ["Chrome", "Edge", "Firefox", "Safari"]
    }, {
        showNotFound: true,
        duplicates: true,
        fullTree: true,
        showBundled: true
    });
    console.log(res);
});
program.command("template").action(() => {
    console.log("-----template-------");
    console.log("js");
    console.log("ts");
    console.log("react");
    console.log("vue2");
    console.log("vue3");
});
program.command("*").action(() => {
    console.log("Invalid command");
    program.help();
});
class 帅哥 {
    constructor() {
        this.身高 = 185;
        this.年龄 = 20;
    }
}
const 对象 = new 帅哥();
program.parse(process.argv);
exports.default = program;
