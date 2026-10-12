import { baseOpt } from "../../../type";
import { TemplateName } from "../templates";
declare function init(opt: baseOpt, directory?: string): Promise<void>;
declare function initGit(projectName: string): Promise<void>;
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
    template?: TemplateName;
}
export { init, initGit, IInitOpt, checkProjectNameIsExistAndAskOverwrite };
