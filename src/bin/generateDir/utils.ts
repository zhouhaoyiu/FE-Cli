import inquirer from "inquirer";
import { existsSync, mkdirSync, realpathSync, writeFileSync } from "fs";
import path from "path";
import { baseOpt } from "../../../type";
import { run, isolatedGitEnvironment } from "../../../utils/run";
import generatePackagejson from "./generatePackagejson";
import { renderLicense, validateLicense } from "./license";
import { getTemplate, TemplateName } from "../templates";
import { renderEslint, renderWebTemplate } from "../templates/render";

async function init(opt: baseOpt, directory: string = opt.projectName): Promise<void> {
  const template = getTemplate(opt.template ?? (opt.typescript ? "ts" : "js"));
  validateLicense(opt.license);
  opt = { ...opt, typescript: template.typescript };
  initRoot(directory);
  if (template.framework === "node") {
    initSrc(directory, opt.typescript);
    initTest(directory, opt.typescript);
    if (opt.typescript) initTsconfig(directory);
  } else {
    renderWebTemplate(template, opt.projectName, directory);
  }
  initPackageJson(opt, directory);
  if (opt.license) writeFileSync(path.join(directory, "LICENSE"), renderLicense(opt.license, opt.author));
  if (opt.eslint) writeFileSync(path.join(directory, "eslint.config.mjs"), renderEslint(template));
  writeFileSync(path.join(directory, ".gitignore"), "node_modules/\ndist/\n*.local\n");
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

function initPackageJson({ projectName, author, typescript, eslint, description, version, license, template }: baseOpt, directory: string): void {
  const packageJson = generatePackagejson({ projectName, author, typescript, eslint, description, version, license, template });
  writeFileSync(`${directory}/package.json`, JSON.stringify(packageJson, null, 2));
}

function initTsconfig(projectName: baseOpt["projectName"]): void {
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
  writeFileSync(`${projectName}/tsconfig.json`, JSON.stringify(config, null, 2));
}

async function initGit(projectName: string): Promise<void> {
  const directory = path.resolve(projectName);
  const options = { cwd: directory, env: isolatedGitEnvironment(), extendEnv: false };
  const location = ["--git-dir", path.join(directory, ".git"), "--work-tree", directory];
  await run("git", [...location, "init"], options);
  const result = await run("git", [...location, "rev-parse", "--show-toplevel"], options);
  if (realpathSync(result.stdout.trim()) !== realpathSync(directory)) throw new Error("Git resolved outside the generated project.");
  await run("git", [...location, "add", "."], options);
  await run("git", [...location, "commit", "-m", "init"], options);
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
  template?: TemplateName;
}

export { init, initGit, IInitOpt, checkProjectNameIsExistAndAskOverwrite };
