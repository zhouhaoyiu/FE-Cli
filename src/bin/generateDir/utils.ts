import inquirer from "inquirer";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { baseOpt } from "../../../type";
import { run } from "../../../utils/run";
import { font } from "../chalk/index";
import generatePackagejson from "../generatePackagejson/index";

function init({ projectName, description, author, version, license, gitinit, typescript, eslint }: baseOpt): string {
  try {
    initRoot(projectName);
    initSrc(projectName, typescript);
    initTest(projectName);
    initPackageJson({ projectName, author, typescript, eslint, description, version, license });
    initLicense(projectName, license);
    initTsconfig(projectName, typescript);
    return "init success";
  } catch (e: any) {
    return String(e);
  }
}

function initRoot(projectName: baseOpt["projectName"]): void {
  mkdirSync(projectName);
}

function initSrc(projectName: baseOpt["projectName"], typescript: baseOpt["typescript"]): void {
  mkdirSync(`${projectName}/src`);

  writeFileSync(`${projectName}/src/index.${typescript ? "ts" : "js"}`, "");
  // 向生成的index文件中写入 console.log("hello world");
  if (typescript) {
    writeFileSync(`${projectName}/src/index.ts`, "console.log('hello world');");
  } else {
    writeFileSync(`${projectName}/src/index.js`, "console.log('hello world');");
  }
}

function initTest(projectName: baseOpt["projectName"]): void {
  mkdirSync(`${projectName}/test`);
}

function initPackageJson({ projectName, author, typescript, eslint, description, version, license }: baseOpt): void {
  const packageJson = generatePackagejson({ projectName, author, typescript, eslint, description, version, license });
  writeFileSync(`${projectName}/package.json`, JSON.stringify(packageJson, null, 2));
}

function initLicense(projectName: baseOpt["projectName"], license: baseOpt["license"]): void {
  if (license.length) {
    writeFileSync(`${projectName}/LICENSE`, "");
  }
}

function initTsconfig(projectName: baseOpt["projectName"], typescript: baseOpt["typescript"]): void {
  if (typescript) {
    writeFileSync(`${projectName}/tsconfig.json`, `{}`);
  }
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
async function checkProjectNameIsExist(projectName: string): Promise<void> {
  if (existsSync(projectName)) {
    const overwrite = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: `${projectName} is exist, do you want to overwrite it?`,
        default: true
      }
    ]);
    if (overwrite.overwrite) {
      font.red(`${projectName} is exist,It will be overwrite`);
      // 删除文件夹
      rmSync(projectName, { recursive: true });
    } else {
      // 直接退出程序
      font.red(`${projectName} is exist,process exit`);
      process.exit(0);
    }
  }
}

interface IInitOpt {
  projectName: string;
  description: string;
  author: string;
  version: string;
  license: string;
  gitinit?: boolean;
}

export { init, initGit, IInitOpt, checkProjectNameIsExist };
