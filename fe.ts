#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from "fs";
// const ejs = require("ejs");
// const copydir = require("copy-dir");

import { getGitInfo } from "./src";

import _package from "./package.json";
import generateDir from "./src/bin/generateDir";
import { IOpt } from "./src/bin/generateDir/utils";

// 获得.env文件中的NODE_ENV的值

const environment: string = readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)![1];
const DEV: boolean = environment === "development";

const program = new Command();

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
  .action((projectName: string, options: { author: string; default: boolean; gitinit: boolean }) => {
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

    const opt: IOpt = {
      projectName,
      author,
      gitinit: options.gitinit,
      default: options.default
    };

    generateDir(opt);
  });

program.parse(process.argv);

export default program;
