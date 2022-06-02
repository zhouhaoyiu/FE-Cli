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

const DEV: boolean = false;

const program: commander.Command = new Command();

program.version(_package.version); // package.json 中的版本号

// TODO: 可以改成可以自定义的author信息,-a配置 (已经完成) 或者像vue-cli那样通过问题获取
program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Skip prompts and use default preset", false)
  .option("-gi, --gitinit", "Initialize git repo", false)
  .option("-a, --author <author>", "Author name for git", false)
  .action((name, options) => {
    const author = !options.author ? getGitInfo("author") : options.author;

    console.log(`Initializing a new project ${name}`);

    if (DEV) {
      console.log(options);
      console.log(author);
    }

    // TODO 增加默认模板信息
    if (options.default) {
      console.log(`This is a default option`);
    }

    // 检测是否存在同名目录
    if (fs.existsSync(name)) {
      console.log(`${name} already exists. It will be overwritten.`);
      // 删除文件夹
      fs.rmSync(name, { recursive: true });
    }

    const opt: IOpt = {
      name,
      author,
      gitinit: options.gitinit,
      default: options.default
    };

    generatedir(opt);
  });

function generatedir(opt: IOpt): void {
  const { name, author, gitinit, default: isDefault } = opt;

  fs.mkdirSync(name);
  fs.mkdirSync(`${name}/src`);
  fs.mkdirSync(`${name}/test`);
  // 生成package.json
  const packageJson = generatePackagejson(name, author);
  fs.writeFileSync(
    `${name}/package.json`,
    JSON.stringify(packageJson, null, 2)
  );

  if (gitinit) {
    console.log(`.git will be init`);
    mkdirSync(`${name}/.gitignore`);

    // 在.gitignore中写入默认的忽略文件 当前是node_modules
    fs.writeFileSync(`${name}/.gitignore`, `node_modules\n`);

    (async () => {
      await run("cd", [name]);
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
  name: string;
  author: string;
  gitinit: boolean;
  default: boolean;
}
