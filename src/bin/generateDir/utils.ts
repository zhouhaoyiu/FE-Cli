import inquirer from "inquirer";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { baseOpt } from "../../../type";
import { run } from "../../../utils/run";
import { font } from "../chalk/index";
import generatePackagejson from "./generatePackagejson";
import { tsconfigTemplate } from "./tpl";

function init({ projectName, description, author, version, license, gitinit, typescript, eslint }: baseOpt): string {
  try {
    initRoot(projectName);
    initSrc(projectName, typescript);
    initTest(projectName);
    initPackageJson({ projectName, author, typescript, eslint, description, version, license });

    license && initLicense(projectName, license);
    typescript && initTsconfig(projectName);
    gitinit && initGit(projectName);

    return "init success";
  } catch (e: any) {
    return String(e);
  }
}

function initRoot(projectName: baseOpt["projectName"]): void {
  mkdirSync(projectName);
}

function initSrc(projectName: baseOpt["projectName"], typescript: baseOpt["typescript"]): void {
  const Extension = typescript ? "ts" : "js";

  mkdirSync(`${projectName}/src`);

  writeFileSync(`${projectName}/src/index.${Extension}`, 'import hello from "./hello"\n\nhello()');

  mkdirSync(`${projectName}/src/hello`);
  writeFileSync(`${projectName}/src/hello/index.${Extension}`, 'function hello() { \n  console.log("hello world");\n}\n\nexport default hello;');
}

function initTest(projectName: baseOpt["projectName"]): void {
  mkdirSync(`${projectName}/test`);
}

function initPackageJson({ projectName, author, typescript, eslint, description, version, license }: baseOpt): void {
  const packageJson = generatePackagejson({ projectName, author, typescript, eslint, description, version, license });
  writeFileSync(`${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
}

function initLicense(projectName: baseOpt["projectName"], license: baseOpt["license"]): void {
  writeFileSync(`${projectName}/LICENSE`, `${license}`);
}

function initTsconfig(projectName: baseOpt["projectName"]): void {
  writeFileSync(`${projectName}/tsconfig.json`, JSON.stringify(tsconfigTemplate));
}

/**
 * @deprecated 还没有完成
 * @param projectName 项目名称
 */
function initGit(projectName: string): void {
  console.log(`.git will be init`);
  mkdirSync(`${projectName}/.gitignore`);

  // 在.gitignore中写入默认的忽略文件 当前是node_modules
  writeFileSync(`${projectName}/.gitignore`, `node_modules\n`);

  (async () => {
    await run("cd", [projectName]);
    await run("git", ["init"]);
    await run("git", ["add", "."]);
    await run("git", ["commit", "-m", "init"]);
  })();
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
        default: true
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
