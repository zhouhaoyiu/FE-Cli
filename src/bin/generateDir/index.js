"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../chalk/index");
const utils_1 = require("./utils");
async function generateDir(opt) {
    if (!opt.projectName) {
        opt.projectName = "unnameProject";
    }
    index_1.font.yellow(`Initializing Project ${opt.projectName}`);
    const res = await (0, utils_1.checkProjectNameIsExistAndAskOverwrite)(opt.projectName);
    if (!res) {
        opt.projectName += "_" + Math.random().toString(36).substring(2, 5);
        index_1.font.green(`Project ${opt.projectName} already exists, use ${opt.projectName}_${Math.random().toString(36).substring(2, 5)} instead`);
    }
    (0, utils_1.init)(opt);
    index_1.font.green(`${opt.projectName} is success created`);
    index_1.font.yellow(`Run Project ${opt.projectName}`);
    index_1.font.yellow(`cd ${opt.projectName}`);
    index_1.font.yellow(`npm install || yarn`);
    index_1.font.yellow(`npm run dev || yarn dev`);
}
exports.default = generateDir;
