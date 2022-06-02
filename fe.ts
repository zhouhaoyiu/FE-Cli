#!/usr/bin/env node
import commander, { Command } from "commander";
import fs, { mkdirSync } from "fs";
import os, { type } from "os";
import path from "path";
import execa from "execa";
// const ejs = require("ejs");
// const copydir = require("copy-dir");

import { generatePackagejson, getGitInfo } from "./src";

import _package from "./package.json";

// 获得.env文件中的NODE_ENV的值

const environment: string = fs
  .readFileSync(".env", "utf-8")
  .match(/NODE_ENV=(.*)/)[1];
const DEV: boolean = environment === "development";

const program: commander.Command = new Command();

program.version(_package.version); // package.json 中的版本号

/**
 * @todo 可以改成可以自定义的author信息,-a配置 (已经完成) 或者像vue-cli那样通过问题获取
 */
program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Skip prompts and use default preset", false)
  .option("-gi, --gitinit", "Initialize git repo", false)
  .option("-a, --author <author>", "Author username for git", false)
  .action((projectName, options) => {
    const author = !options.author ? getGitInfo("author") : options.author;

    console.log(`Initializing a new project ${projectName}`);

    if (DEV) {
      console.log(options);
      console.log(author);
    }

    // TODO 增加默认模板信息
    if (options.default) {
      console.log(`This is a default option`);
    }

    // 检测是否存在同名目录
    if (fs.existsSync(projectName)) {
      console.log(`${projectName} already exists. It will be overwritten.`);
      // 删除文件夹
      fs.rmSync(projectName, { recursive: true });
    }

    const opt: IOpt = {
      projectName,
      author,
      gitinit: options.gitinit,
      default: options.default
    };

    generatedir(opt);
  });

function generatedir(opt: IOpt): void {
  const { projectName, author, gitinit, default: isDefault } = opt;

  fs.mkdirSync(projectName);
  fs.mkdirSync(`${projectName}/src`);
  fs.mkdirSync(`${projectName}/test`);
  // 生成package.json
  const packageJson = generatePackagejson(projectName, author);
  fs.writeFileSync(
    `${projectName}/package.json`,
    JSON.stringify(packageJson, null, 2)
  );

  /**
   * @zhouhaoyiu 2022-06-02 这个功能还没有完成
   */

  if (gitinit) {
    initGit(projectName);
  }
  /**
   * @deprecated 还没有完成
   * @param projectName 项目名称
   */
  function initGit(projectName: string): void {
    console.log(`.git will be init`);
    mkdirSync(`${projectName}/.gitignore`);

    // 在.gitignore中写入默认的忽略文件 当前是node_modules
    fs.writeFileSync(`${projectName}/.gitignore`, `node_modules\n`);

    (async () => {
      await run("cd", [projectName]);
      await run("git", ["init"]);
      await run("git", ["add", "."]);
      await run("git", ["commit", "-m", "init"]);
    })();
  }
}

function run(command: string, args: string[]) {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }
  return execa(command, args);
}

program.parse(process.argv);

export default program;

interface IOpt {
  projectName: string;
  author: string;
  gitinit: boolean;
  default: boolean;
}
