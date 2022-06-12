#!/usr/bin/env node
import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";

import generateDir from "./src/bin/generateDir";
import getGitInfo from "./src/bin/getGitInfo";
import _package from "./package.json";
import baseOpts from "./utils/preset";
import { font } from "./src/bin/chalk/index";
import { IInitOpt } from "./src/bin/generateDir/utils";
import { projectInfo, dependenciesInfo } from "./utils/promptInfo";

let DEV = false;
// 获得.env文件中的NODE_ENV的值
if (fs.existsSync(".env")) {
  const environment = fs.readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)![1];
  DEV = environment === "development";
}

const program = new Command();

program.version(_package.version); // package.json 中的版本号

program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Skip prompts and use default preset", false)
  .option("-gi, --gitinit", "Initialize git repo", false)
  .option("-a, --author <author>", "Author username for git", false)
  .action(async (projectName: string, options: { author: string; default: boolean; gitinit: boolean }) => {
    const author: string = (options.author ? options.author : getGitInfo("author")) || "";

    if (options.default) {
      font.blue("You are using the default preset.");
      baseOpts.author = author;
      baseOpts.projectName = projectName;
      baseOpts.gitinit = options.gitinit;
      await generateDir(baseOpts);
      return;
    }

    const info: IInitOpt = await inquirer.prompt(projectInfo(projectName, author));
    for (const key of Object.keys(info)) {
      // @ts-ignore
      baseOpts[key] = info[key];
    }

    const dependencies = await inquirer.prompt(
      dependenciesInfo({
        typescript: baseOpts.typescript,
        eslint: baseOpts.eslint
      })
    );

    const dependenciesArr = dependencies.dependencies as string[];
    baseOpts.typescript = dependenciesArr.includes("typescript");
    baseOpts.eslint = dependenciesArr.includes("eslint");

    DEV && console.log(baseOpts);

    await generateDir(baseOpts);
  });

program
  .command("help")
  .description("Show help")
  .action(() => {
    program.help();
  });

program
  .command("test")
  .description("Run tests")
  .action(() => {
    console.log("test");
  });

program
  .command("info")
  .description("print debugging information about your environment")
  .action(async (cmd: any) => {
    font.bold("\nEnvironment Info:");
    const res = await require("envinfo").run(
      {
        System: ["OS", "CPU"],
        Binaries: ["Node", "Yarn", "npm"],
        Browsers: ["Chrome", "Edge", "Firefox", "Safari"]
      },
      {
        showNotFound: true,
        duplicates: true,
        fullTree: true
      }
    );
    console.log(res);
  });

program.command("*").action(() => {
  console.log("Invalid command");
  program.help();
});

program.parse(process.argv);
export default program;
