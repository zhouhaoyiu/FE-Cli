"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
function getGitInfo(opt) {
    // 获得本地git中配置的用户名和邮箱
    var configPath = path_1["default"].join(os_1["default"].homedir(), ".gitconfig");
    var config = fs_1["default"].existsSync(configPath)
        ? fs_1["default"].readFileSync(configPath, "utf-8")
        : "";
    var name = "noname";
    var email = "noemail";
    if (config.match(/name = (.*)/) && config.match(/name = (.*)/).length > 1) {
        name = config.match(/name = (.*)/)[1];
    }
    if (config.match(/email = (.*)/) &&
        config.match(/email = (.*)/).length > 1) {
        email = config.match(/email = (.*)/)[1];
    }
    var author = name && email ? "".concat(name, " <").concat(email, ">") : "";
    switch (opt) {
        case "name":
            return name;
        case "email":
            return email;
        case "author":
            return author;
        case "config":
            return config;
    }
}
exports["default"] = getGitInfo;
