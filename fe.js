#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
var _c;
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
const templates_1 = require("./src/bin/templates");
const license_1 = require("./src/bin/generateDir/license");
const environment = (_c = process.env.NODE_ENV) !== null && _c !== void 0 ? _c : (fs_1.default.existsSync(".env")
    ? (_b = (_a = fs_1.default
        .readFileSync(".env", "utf-8")
        .match(/^NODE_ENV=(.*)$/m)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim()
    : undefined);
const DEV = environment === "development";
const program = new commander_1.Command();
process.argv = process.argv.map(arg => (arg === "-gi" ? "--gitinit" : arg));
program.version(package_json_1.default.version);
program
    .command("init <name>")
    // .description("Initialize a new project")
    .option("-d, --default", "Use default project options", false)
    .option("-g, --gitinit", "Initialize git repo", false)
    .option("-a, --author <author>", "Author in package.json")
    .option("-t, --template <template>", `Template name (${templates_1.templateNames.join(", ")})`)
    .option("--eslint", "Generate ESLint configuration and a lint command", false)
    .option("--license <license>", "License identifier (MIT, Apache-2.0, GPL-3.0-only, BSD-3-Clause, ISC)")
    .action(async (projectName, options) => {
    var _a, _b, _c, _d, _e;
    const author = (options.author ? options.author : (0, getGitInfo_1.default)("author")) || "";
    const template = (0, templates_1.getTemplate)((_a = options.template) !== null && _a !== void 0 ? _a : "js");
    (0, license_1.validateLicense)((_b = options.license) !== null && _b !== void 0 ? _b : "");
    const opts = {
        ...preset_1.default,
        author,
        projectName,
        gitinit: options.gitinit,
        typescript: template.typescript,
        template: ((_c = options.template) !== null && _c !== void 0 ? _c : "js"),
        eslint: options.eslint,
        license: (_d = options.license) !== null && _d !== void 0 ? _d : ""
    };
    if (options.default || options.template !== undefined) {
        await (0, generateDir_1.default)(opts);
        return;
    }
    const info = await inquirer_1.default.prompt((0, promptInfo_1.projectInfo)(projectName, author, options.license));
    Object.assign(opts, info);
    opts.typescript = (0, templates_1.getTemplate)((_e = opts.template) !== null && _e !== void 0 ? _e : "js").typescript;
    const dependencies = await inquirer_1.default.prompt((0, promptInfo_1.dependenciesInfo)({
        eslint: opts.eslint
    }));
    const dependenciesArr = dependencies.dependencies;
    opts.eslint = dependenciesArr.includes("eslint");
    if (DEV)
        console.log(opts);
    await (0, generateDir_1.default)(opts);
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
    .action(async () => {
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
    for (const name of templates_1.templateNames)
        console.log(`${name} — ${templates_1.templates[name].name}`);
});
program.command("*").action(() => {
    console.log("Invalid command");
    program.help();
});
if (require.main === module) {
    program.parseAsync(process.argv).catch((error) => {
        console.error(error instanceof Error ? error.message : String(error));
        process.exitCode = 1;
    });
}
exports.default = program;
