"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
exports.initGit = initGit;
exports.checkProjectNameIsExistAndAskOverwrite = checkProjectNameIsExistAndAskOverwrite;
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = require("fs");
const run_1 = require("../../../utils/run");
const generatePackagejson_1 = __importDefault(require("./generatePackagejson"));
const tpl_1 = require("./tpl");
async function init(opt, directory = opt.projectName) {
    initRoot(directory);
    initSrc(directory, opt.typescript);
    initTest(directory, opt.typescript);
    initPackageJson(opt, directory);
    if (opt.license)
        initLicense(directory, opt.license);
    if (opt.typescript)
        initTsconfig(directory);
    if (opt.gitinit)
        await initGit(directory);
}
function initRoot(projectName) {
    (0, fs_1.mkdirSync)(projectName);
}
function initSrc(projectName, typescript) {
    const Extension = typescript ? "ts" : "js";
    (0, fs_1.mkdirSync)(`${projectName}/src`);
    (0, fs_1.writeFileSync)(`${projectName}/src/index.${Extension}`, typescript ? 'import hello from "./hello";\n\nhello();\n' : 'const hello = require("./hello");\n\nhello();\n');
    (0, fs_1.mkdirSync)(`${projectName}/src/hello`);
    const exportHello = typescript ? "export default hello;" : "module.exports = hello;";
    (0, fs_1.writeFileSync)(`${projectName}/src/hello/index.${Extension}`, `function hello() {\n  console.log("hello world");\n}\n\n${exportHello}\n`);
}
function initTest(projectName, typescript) {
    (0, fs_1.mkdirSync)(`${projectName}/test`);
    const entry = typescript ? "dist/index.js" : "src/index.js";
    (0, fs_1.writeFileSync)(`${projectName}/test/index.test.js`, `const { test } = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const path = require("node:path");

test("prints a greeting", () => {
  const output = execFileSync(process.execPath, [path.join(__dirname, "../${entry}")], { encoding: "utf8" });
  assert.equal(output.trim(), "hello world");
});
`);
}
function initPackageJson({ projectName, author, typescript, eslint, description, version, license }, directory) {
    const packageJson = (0, generatePackagejson_1.default)({ projectName, author, typescript, eslint, description, version, license });
    (0, fs_1.writeFileSync)(`${directory}/package.json`, JSON.stringify(packageJson, null, 2));
}
function initLicense(projectName, license) {
    (0, fs_1.writeFileSync)(`${projectName}/LICENSE`, `${license}`);
}
function initTsconfig(projectName) {
    const config = {
        ...tpl_1.tsconfigTemplate.default,
        compilerOptions: { ...tpl_1.tsconfigTemplate.default.compilerOptions, rootDir: "src", outDir: "dist", noEmitOnError: true, types: [] },
        include: ["src/**/*.ts"]
    };
    (0, fs_1.writeFileSync)(`${projectName}/tsconfig.json`, JSON.stringify(config, null, 2));
}
async function initGit(projectName) {
    (0, fs_1.writeFileSync)(`${projectName}/.gitignore`, "node_modules/\ndist/\n");
    const options = { cwd: projectName };
    await (0, run_1.run)("git", ["init"], options);
    await (0, run_1.run)("git", ["add", "."], options);
    await (0, run_1.run)("git", ["commit", "-m", "init"], options);
}
/**
 * @zhouhaoyiu
 * @function 检查当前同名的项目是否存在
 * @param projectName 项目名称
 */
async function checkProjectNameIsExistAndAskOverwrite(projectName) {
    if ((0, fs_1.existsSync)(projectName)) {
        const overwrite = await inquirer_1.default.prompt([
            {
                type: "confirm",
                name: "overwrite",
                message: `${projectName} is exist, do you want to overwrite it?`,
                default: false
            }
        ]);
        return overwrite.overwrite;
    }
    return true;
}
