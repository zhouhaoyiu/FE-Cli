#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import os from "os";
import path from "path";
// const ejs = require("ejs");
// const copydir = require("copy-dir");

import { generatePackagejson, getGitInfo } from "./src";

import _package from "./package.json";

const program = new Command();

program.version(_package.version); // package.json 中的版本号

program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Skip prompts and use default preset", false)
  .action((name, options) => {
    const author = getGitInfo("author");
    console.log(`Initializing a new project ${name}`);
    console.log(options);
    if (options.default) {
      console.log(`This is a default option`);
    }
    if (fs.existsSync(name)) {
      console.log(`${name} already exists`);
    } else {
      fs.mkdirSync(name);
      fs.mkdirSync(`${name}/src`);
      fs.mkdirSync(`${name}/test`);
      // 生成package.json
      const packageJson = generatePackagejson(name, author);
      fs.writeFileSync(
        `${name}/package.json`,
        JSON.stringify(packageJson, null, 2)
      );
    }
  });

program.parse(process.argv);

export default program;
