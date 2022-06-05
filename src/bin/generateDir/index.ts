import { baseOpt } from "../../../type";
import { font } from "../chalk/index";
import { checkProjectNameIsExistAndAskOverwrite, init } from "./utils";

async function generateDir(opt: baseOpt): Promise<void> {
  if (!opt.projectName) {
    opt.projectName = "unnameProject";
  }

  font.yellow(`Initializing Project ${opt.projectName}`);

  const res = await checkProjectNameIsExistAndAskOverwrite(opt.projectName);
  if (!res) {
    opt.projectName += "_" + Math.random().toString(36).substring(2, 5);
    font.green(`Project ${opt.projectName} already exists, use ${opt.projectName}_${Math.random().toString(36).substring(2, 5)} instead`);
  }

  init(opt);

  font.green(`${opt.projectName} is success created`);
}

export default generateDir;
