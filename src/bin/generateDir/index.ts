import { mkdirSync, writeFileSync } from "fs";
import generatePackagejson from "../generatePackagejson";
import { checkProjectNameIsExist, initGit, IOpt } from "./utils";

function generateDir(opt: IOpt): void {
  const { projectName, author, gitinit, default: isDefault } = opt;

  checkProjectNameIsExist(projectName);

  mkdirSync(projectName);
  mkdirSync(`${projectName}/src`);
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
