import { baseOpt } from "../../../type";
import { font } from "../chalk/index";
import { checkProjectNameIsExistAndAskOverwrite, init } from "./utils";
import { existsSync, lstatSync, mkdtempSync, renameSync, rmSync } from "fs";
import path from "path";

async function generateDir(opt: baseOpt): Promise<void> {
  if (!/^[a-zA-Z0-9_][a-zA-Z0-9_-]*$/.test(opt.projectName)) {
    throw new Error("Project name must contain only letters, numbers, underscores or hyphens, and cannot start with a hyphen.");
  }
  const target = path.resolve(opt.projectName);
  const existing = lstatSync(target, { throwIfNoEntry: false });
  if (existing?.isSymbolicLink()) throw new Error("Cannot overwrite a symbolic link.");

  font.yellow(`Initializing Project ${opt.projectName}`);

  const res = await checkProjectNameIsExistAndAskOverwrite(opt.projectName);
  if (!res) {
    font.yellow("Project creation cancelled.");
    return;
  }

  const stagingRoot = mkdtempSync(path.join(process.cwd(), ".fe-cli-"));
  const stagedProject = path.join(stagingRoot, "generated-project");
  const backup = path.join(stagingRoot, "previous-project");
  let backedUp = false;
  let preserveBackup = false;
  try {
    await init(opt, stagedProject);
    if (existsSync(target)) {
      if (!existing) throw new Error("The target appeared during initialization. Run the command again.");
      renameSync(target, backup);
      backedUp = true;
    }
    try {
      renameSync(stagedProject, target);
    } catch (error) {
      if (backedUp) {
        try {
          renameSync(backup, target);
        } catch (restoreError) {
          preserveBackup = true;
          throw new Error(`Could not restore the previous project: ${String(restoreError)}. Its backup is at ${backup}`);
        }
      }
      throw error;
    }
  } finally {
    if (!preserveBackup) rmSync(stagingRoot, { recursive: true, force: true });
  }

  font.green(`${opt.projectName} is success created`);

  font.yellow(`Run Project ${opt.projectName}`);
  font.yellow(`cd ${opt.projectName}`);
  font.yellow(`npm install || yarn`);
  font.yellow(`npm run dev || yarn dev`);
}

export default generateDir;
