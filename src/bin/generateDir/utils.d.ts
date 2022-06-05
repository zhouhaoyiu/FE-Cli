import { baseOpt } from "../../../type";
declare function init({ projectName, description, author, version, license, gitinit, typescript, eslint }: baseOpt): string;
/**
 * @deprecated 还没有完成
 * @param projectName 项目名称
 */
declare function initGit(projectName: string): void;
/**
 * @zhouhaoyiu
 * @function 检查当前同名的项目是否存在
 * @param projectName 项目名称
 */
declare function checkProjectNameIsExistAndAskOverwrite(projectName: string): Promise<boolean>;
interface IInitOpt {
    projectName: string;
    description: string;
    author: string;
    version: string;
    license: string;
    gitinit?: boolean;
}
export { init, initGit, IInitOpt, checkProjectNameIsExistAndAskOverwrite };
