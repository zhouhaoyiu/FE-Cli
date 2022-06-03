#!/usr/bin/env node
declare module "src/bin/generatePackagejson/index" {
    function generatePackagejson(name: string, author?: string): Record<string, any>;
    export default generatePackagejson;
}
declare module "src/bin/getGinInfo/index" {
    function getGitInfo(opt: "name" | "email" | "author" | "config"): string;
    export default getGitInfo;
}
declare module "src/index" {
    import generatePackagejson from "src/bin/generatePackagejson/index";
    import getGitInfo from "src/bin/getGinInfo/index";
    export { generatePackagejson, getGitInfo };
}
declare module "utils/run" {
    function run(command: string, args: string[]): any;
    export { run };
}
declare module "src/bin/generateDir/utils" {
    /**
     * @deprecated 还没有完成
     * @param projectName 项目名称
     */
    function initGit(projectName: string): void;
    /**
     * @zhouhaoyiu
     * @function 检查当前同名的项目是否存在
     * @param projectName 项目名称
     */
    function checkProjectNameIsExist(projectName: string): void;
    interface IOpt {
        projectName: string;
        author: string;
        gitinit: boolean;
        default: boolean;
    }
    export { initGit, IOpt, checkProjectNameIsExist };
}
declare module "src/bin/generateDir/index" {
    import { IOpt } from "src/bin/generateDir/utils";
    function generateDir(opt: IOpt): void;
    export default generateDir;
}
declare module "fe" {
    import commander from "commander";
    const program: commander.Command;
    export default program;
}
