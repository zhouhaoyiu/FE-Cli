import inquirer from "inquirer";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { baseOpt } from "../../../type";
import { run } from "../../../utils/run";
import generatePackagejson from "./generatePackagejson";
import { tsconfigTemplate } from "./tpl";

async function init(opt: baseOpt, directory: string = opt.projectName): Promise<void> {
  initRoot(directory);
  initSrc(directory, opt.typescript);
  initTest(directory, opt.typescript);
  initPackageJson(opt, directory);
  if (opt.license) initLicense(directory, opt.license);
  if (opt.typescript) initTsconfig(directory);
  if (opt.gitinit) await initGit(directory);
}

function initRoot(projectName: baseOpt["projectName"]): void {
  mkdirSync(projectName);
}

function initSrc(projectName: baseOpt["projectName"], typescript: baseOpt["typescript"]): void {
  const Extension = typescript ? "ts" : "js";

  mkdirSync(`${projectName}/src`);

  writeFileSync(`${projectName}/src/index.${Extension}`, typescript ? 'import hello from "./hello";\n\nhello();\n' : 'const hello = require("./hello");\n\nhello();\n');

  mkdirSync(`${projectName}/src/hello`);
  const exportHello = typescript ? "export default hello;" : "module.exports = hello;";
  writeFileSync(`${projectName}/src/hello/index.${Extension}`, `function hello() {\n  console.log("hello world");\n}\n\n${exportHello}\n`);
}

function initTest(projectName: baseOpt["projectName"], typescript: boolean): void {
  mkdirSync(`${projectName}/test`);
  const entry = typescript ? "dist/index.js" : "src/index.js";
  writeFileSync(
    `${projectName}/test/index.test.js`,
    `const { test } = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const path = require("node:path");

test("prints a greeting", () => {
  const output = execFileSync(process.execPath, [path.join(__dirname, "../${entry}")], { encoding: "utf8" });
  assert.equal(output.trim(), "hello world");
});
`
  );
}

function initPackageJson({ projectName, author, typescript, eslint, description, version, license }: baseOpt, directory: string): void {
  const packageJson = generatePackagejson({ projectName, author, typescript, eslint, description, version, license });
  writeFileSync(`${directory}/package.json`, JSON.stringify(packageJson, null, 2));
}

function initLicense(projectName: baseOpt["projectName"], license: baseOpt["license"]): void {
  writeFileSync(`${projectName}/LICENSE`, `${license}`);
}

function initTsconfig(projectName: baseOpt["projectName"]): void {
  const config = {
    ...tsconfigTemplate.default,
    compilerOptions: { ...tsconfigTemplate.default.compilerOptions, rootDir: "src", outDir: "dist", noEmitOnError: true, types: [] },
    include: ["src/**/*.ts"]
  };
  writeFileSync(`${projectName}/tsconfig.json`, JSON.stringify(config, null, 2));
}

async function initGit(projectName: string): Promise<void> {
  writeFileSync(`${projectName}/.gitignore`, "node_modules/\ndist/\n");
  const options = { cwd: projectName };
  await run("git", ["init"], options);
  await run("git", ["add", "."], options);
  await run("git", ["commit", "-m", "init"], options);
}

/**
 * @zhouhaoyiu
 * @function 检查当前同名的项目是否存在
 * @param projectName 项目名称
 */
async function checkProjectNameIsExistAndAskOverwrite(projectName: string): Promise<boolean> {
  if (existsSync(projectName)) {
    const overwrite = await inquirer.prompt([
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

interface IInitOpt {
  projectName: string;
  description: string;
  author: string;
  version: string;
  license: string;
  gitinit?: boolean;
}

export { init, initGit, IInitOpt, checkProjectNameIsExistAndAskOverwrite };
