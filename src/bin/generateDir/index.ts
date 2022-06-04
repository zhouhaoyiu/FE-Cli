import { mkdirSync, writeFileSync } from "fs";
import { baseOpt } from "../../../type";
import { font } from "../chalk/index";
import generatePackagejson from "../generatePackagejson";
import { checkProjectNameIsExist, initGit } from "./utils";

function generateDir(opt: baseOpt): void {
  let { projectName, description, author, version, license, gitinit, typescript, eslint } = opt;

  font.yellow(`Initializing Project ${projectName}`);

  if (!projectName) {
    projectName = "unnameProject";
  }

  checkProjectNameIsExist(projectName);

  mkdirSync(projectName);

  mkdirSync(`${projectName}/src`);
  writeFileSync(`${projectName}/src/main.${typescript ? "ts" : "js"}`, "");

  mkdirSync(`${projectName}/test`);
  // 生成package.json
  const packageJson = generatePackagejson({ projectName, author, typescript, eslint, description, version, license });
  writeFileSync(`${projectName}/package.json`, JSON.stringify(packageJson, null, 2));

  if (typescript) {
    writeFileSync(`${projectName}/tsconfig.json`, `{}`);
  }

  /**
   * @zhouhaoyiu 2022-06-02 这个功能还没有完成
   */

  if (gitinit) {
    initGit(projectName);
  }

  font.green(`${projectName} is success created`);
}

export default generateDir;
