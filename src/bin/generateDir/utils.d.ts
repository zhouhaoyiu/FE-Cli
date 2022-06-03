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
declare function checkProjectNameIsExist(projectName: string): void;
interface IOpt {
    projectName: string;
    author: string;
    gitinit: boolean;
    default: boolean;
}
export { initGit, IOpt, checkProjectNameIsExist };
