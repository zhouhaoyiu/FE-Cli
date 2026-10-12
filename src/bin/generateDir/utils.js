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
const path_1 = __importDefault(require("path"));
const run_1 = require("../../../utils/run");
const generatePackagejson_1 = __importDefault(require("./generatePackagejson"));
const license_1 = require("./license");
const templates_1 = require("../templates");
const render_1 = require("../templates/render");
async function init(opt, directory = opt.projectName) {
    var _a;
    const template = (0, templates_1.getTemplate)((_a = opt.template) !== null && _a !== void 0 ? _a : (opt.typescript ? "ts" : "js"));
    (0, license_1.validateLicense)(opt.license);
    opt = { ...opt, typescript: template.typescript };
    initRoot(directory);
    if (template.framework === "node") {
        initSrc(directory, opt.typescript);
        initTest(directory, opt.typescript);
        if (opt.typescript)
            initTsconfig(directory);
    }
    else {
        (0, render_1.renderWebTemplate)(template, opt.projectName, directory);
    }
    initPackageJson(opt, directory);
    if (opt.license)
        (0, fs_1.writeFileSync)(path_1.default.join(directory, "LICENSE"), (0, license_1.renderLicense)(opt.license, opt.author));
    if (opt.eslint)
        (0, fs_1.writeFileSync)(path_1.default.join(directory, "eslint.config.mjs"), (0, render_1.renderEslint)(template));
    (0, fs_1.writeFileSync)(path_1.default.join(directory, ".gitignore"), "node_modules/\ndist/\n*.local\n");
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
function initPackageJson({ projectName, author, typescript, eslint, description, version, license, template }, directory) {
    const packageJson = (0, generatePackagejson_1.default)({ projectName, author, typescript, eslint, description, version, license, template });
    (0, fs_1.writeFileSync)(`${directory}/package.json`, JSON.stringify(packageJson, null, 2));
}
function initTsconfig(projectName) {
    const config = {
        compilerOptions: {
            target: "ES2022",
            module: "Node16",
            moduleResolution: "Node16",
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            rootDir: "src",
            outDir: "dist",
            noEmitOnError: true,
            types: ["node"]
        },
        include: ["src/**/*.ts"]
    };
    (0, fs_1.writeFileSync)(`${projectName}/tsconfig.json`, JSON.stringify(config, null, 2));
}
async function initGit(projectName) {
    const directory = path_1.default.resolve(projectName);
    const options = { cwd: directory, env: (0, run_1.isolatedGitEnvironment)(), extendEnv: false };
    const location = ["--git-dir", path_1.default.join(directory, ".git"), "--work-tree", directory];
    await (0, run_1.run)("git", [...location, "init"], options);
    const result = await (0, run_1.run)("git", [...location, "rev-parse", "--show-toplevel"], options);
    if ((0, fs_1.realpathSync)(result.stdout.trim()) !== (0, fs_1.realpathSync)(directory))
        throw new Error("Git resolved outside the generated project.");
    await (0, run_1.run)("git", [...location, "add", "."], options);
    await (0, run_1.run)("git", [...location, "commit", "-m", "init"], options);
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
