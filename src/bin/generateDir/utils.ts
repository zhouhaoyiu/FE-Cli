import { existsSync, mkdirSync, PathLike, rmSync, writeFileSync } from "fs";
import { run } from "../../../utils/run";

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
function checkProjectNameIsExist(projectName: string): void {
  if (existsSync(projectName)) {
    console.log(`${projectName} already exists. It will be overwritten.`);
    // 删除文件夹
    rmSync(projectName, { recursive: true });
  }
}

interface IOpt {
  projectName: string;
  author: string;
  gitinit: boolean;
  default: boolean;
}

export { initGit, IOpt, checkProjectNameIsExist };
