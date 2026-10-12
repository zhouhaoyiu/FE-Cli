"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../chalk/index");
const utils_1 = require("./utils");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
async function generateDir(opt) {
    if (!/^[a-zA-Z0-9_][a-zA-Z0-9_-]*$/.test(opt.projectName)) {
        throw new Error("Project name must contain only letters, numbers, underscores or hyphens, and cannot start with a hyphen.");
    }
    const target = path_1.default.resolve(opt.projectName);
    const existing = (0, fs_1.lstatSync)(target, { throwIfNoEntry: false });
    if (existing === null || existing === void 0 ? void 0 : existing.isSymbolicLink())
        throw new Error("Cannot overwrite a symbolic link.");
    index_1.font.yellow(`Initializing Project ${opt.projectName}`);
    const res = await (0, utils_1.checkProjectNameIsExistAndAskOverwrite)(opt.projectName);
    if (!res) {
        index_1.font.yellow("Project creation cancelled.");
        return;
    }
    const stagingRoot = (0, fs_1.mkdtempSync)(path_1.default.join(process.cwd(), ".fe-cli-"));
    const stagedProject = path_1.default.join(stagingRoot, "generated-project");
    const backup = path_1.default.join(stagingRoot, "previous-project");
    let backedUp = false;
    let preserveBackup = false;
    try {
        await (0, utils_1.init)(opt, stagedProject);
        if ((0, fs_1.existsSync)(target)) {
            if (!existing)
                throw new Error("The target appeared during initialization. Run the command again.");
            (0, fs_1.renameSync)(target, backup);
            backedUp = true;
        }
        try {
            (0, fs_1.renameSync)(stagedProject, target);
        }
        catch (error) {
            if (backedUp) {
                try {
                    (0, fs_1.renameSync)(backup, target);
                }
                catch (restoreError) {
                    preserveBackup = true;
                    throw new Error(`Could not restore the previous project: ${String(restoreError)}. Its backup is at ${backup}`);
                }
            }
            throw error;
        }
    }
    finally {
        if (!preserveBackup)
            (0, fs_1.rmSync)(stagingRoot, { recursive: true, force: true });
    }
    index_1.font.green(`${opt.projectName} is success created`);
    index_1.font.yellow(`Run Project ${opt.projectName}`);
    index_1.font.yellow(`cd ${opt.projectName}`);
    index_1.font.yellow(`npm install || yarn`);
    index_1.font.yellow(`npm run dev || yarn dev`);
}
exports.default = generateDir;
