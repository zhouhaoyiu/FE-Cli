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
function init({ projectName, description, author, version, license, gitinit, typescript, eslint }) {
    try {
        initRoot(projectName);
        initSrc(projectName, typescript);
        initTest(projectName);
        initPackageJson({ projectName, author, typescript, eslint, description, version, license });
        license && initLicense(projectName, license);
        typescript && initTsconfig(projectName);
        gitinit && initGit(projectName);
        return "init success";
    }
    catch (e) {
        return String(e);
    }
}
function initRoot(projectName) {
    (0, fs_1.mkdirSync)(projectName);
}
function initSrc(projectName, typescript) {
    const Extension = typescript ? "ts" : "js";
    (0, fs_1.mkdirSync)(`${projectName}/src`);
    (0, fs_1.writeFileSync)(`${projectName}/src/index.${Extension}`, 'import hello from "./hello"\n\nhello()');
    (0, fs_1.mkdirSync)(`${projectName}/src/hello`);
    (0, fs_1.writeFileSync)(`${projectName}/src/hello/index.${Extension}`, 'function hello() { \n  console.log("hello world");\n}\n\nexport default hello;');
}
function initTest(projectName) {
    (0, fs_1.mkdirSync)(`${projectName}/test`);
    (0, fs_1.writeFileSync)(`${projectName}/test/index.js`, 'import hello from "./hello"\n\nhello()');
}
function initPackageJson({ projectName, author, typescript, eslint, description, version, license }) {
    const packageJson = (0, generatePackagejson_1.default)({ projectName, author, typescript, eslint, description, version, license });
    (0, fs_1.writeFileSync)(`${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
}
function initLicense(projectName, license) {
    (0, fs_1.writeFileSync)(`${projectName}/LICENSE`, `${license}`);
}
function initTsconfig(projectName) {
    (0, fs_1.writeFileSync)(`${projectName}/tsconfig.json`, JSON.stringify(tpl_1.tsconfigTemplate));
}
/**
 * @deprecated 还没有完成
 * @param projectName 项目名称
 */
function initGit(projectName) {
    console.log(`.git will be init`);
    (0, fs_1.mkdirSync)(`${projectName}/.gitignore`);
    // 在.gitignore中写入默认的忽略文件 当前是node_modules
    (0, fs_1.writeFileSync)(`${projectName}/.gitignore`, `node_modules\n`);
    (async () => {
        await (0, run_1.run)("cd", [projectName]);
        await (0, run_1.run)("git", ["init"]);
        await (0, run_1.run)("git", ["add", "."]);
        await (0, run_1.run)("git", ["commit", "-m", "init"]);
    })();
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
                default: true
            }
        ]);
        return overwrite.overwrite;
    }
    return true;
}
