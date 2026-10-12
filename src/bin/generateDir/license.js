"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseNames = void 0;
exports.validateLicense = validateLicense;
exports.renderLicense = renderLicense;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
exports.licenseNames = ["MIT", "Apache-2.0", "GPL-3.0-only", "BSD-3-Clause", "ISC"];
function validateLicense(license) {
    if (license && !exports.licenseNames.includes(license)) {
        throw new Error(`Unsupported license: ${license}. Choose ${exports.licenseNames.join(", ")}, or omit it.`);
    }
}
function renderLicense(license, author) {
    validateLicense(license);
    if (!license)
        return "";
    const template = (0, fs_1.readFileSync)(path_1.default.join(__dirname, "licenses", `${license}.txt`), "utf8");
    const year = String(new Date().getFullYear());
    const owner = author.trim() || "Project contributors";
    return (template
        .replace(/<year>|\[year\]|\[yyyy\]/g, year)
        .replace(/<copyright holders>|<owner>|\[fullname\]|\[name of copyright owner\]/g, () => owner)
        .trimEnd() + "\n");
}
