import { baseOpt } from "../../../type";
import { font } from "../chalk/index";
import { checkProjectNameIsExist, init } from "./utils";

async function generateDir(opt: baseOpt): Promise<void> {
  let { projectName, description, author, version, license, gitinit, typescript, eslint } = opt;

  font.yellow(`Initializing Project ${projectName}`);

  if (!projectName) {
    projectName = "unnameProject";
  }

  await checkProjectNameIsExist(projectName);

  init({ projectName, description, author, version, license, gitinit, typescript, eslint });

  // if (gitinit) {
  //   initGit(projectName);
  // }

  font.green(`${projectName} is success created`);
}

export default generateDir;
