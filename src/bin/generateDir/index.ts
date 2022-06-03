import { mkdirSync, writeFileSync } from "fs";
import { baseOpt } from "../../../type";
import generatePackagejson from "../generatePackagejson";
import { checkProjectNameIsExist, initGit } from "./utils";

function generateDir(opt: baseOpt): void {
  const { projectName = "UnnamedProject", author, gitinit, default: isDefault, typescript } = opt;

  checkProjectNameIsExist(projectName);

  mkdirSync(projectName);
  
  mkdirSync(`${projectName}/src`);
  writeFileSync(`${projectName}/src/main.${typescript ? "ts" : "js"}`, "");

  
  mkdirSync(`${projectName}/test`);
  // 生成package.json
  const packageJson = generatePackagejson(projectName, author);
  writeFileSync(`${projectName}/package.json`, JSON.stringify(packageJson, null, 2));

  /**
   * @zhouhaoyiu 2022-06-02 这个功能还没有完成
   */

  if (gitinit) {
    initGit(projectName);
  }
}

export default generateDir;
