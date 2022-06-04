#!/usr/bin/env node
import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";

import generateDir from "./src/bin/generateDir";
import getGitInfo from "./src/bin/getGitInfo";
import _package from "./package.json"; // @ts-ignore
import { baseOpt } from "./type";
import { font } from "./src/bin/chalk/index";
import { IInitOpt } from "./src/bin/generateDir/utils";
// import { font } from "./src/bin/chalk";

let DEV = false;
// 获得.env文件中的NODE_ENV的值
if (fs.existsSync(".env")) {
  const environment = fs.readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)![1];
  DEV = environment === "development";
}

const program = new Command();

const projectInfo = (projectName: string, author: string) => {
  return [
    {
      type: "input",
      name: "projectName",
      message: "Project name",
      default: projectName
    },
    {
      type: "input",
      name: "description",
      message: "Project description",
      default: "''"
    },
    {
      type: "input",
      name: "author",
      message: "Author",
      default: author
    },
    {
      type: "input",
      name: "version",
      message: "Version",
      default: "1.0.0"
    },
    {
      type: "list",
      name: "license",
      message: "License",
      choices: Lisence
    }
  ];
};
const Lisence = [
  {
    name: "MIT",
    value: "MIT"
  },
  {
    name: "Apache",
    value: "Apache"
  },
  {
    name: "GPL",
    value: "GPL"
  },
  {
    name: "BSD",
    value: "BSD"
  },
  {
    name: "ISC",
    value: "ISC"
  },
  {
    name: "skip",
    value: ""
  }
];

const dependenciesInfo = ({ typescript, eslint }: { typescript: boolean; eslint: boolean }) => {
  return [
    {
      type: "checkbox",
      name: "dependencies",
      message: "Which dependencies do you want to add?",
      choices: [
        {
          name: "TypeScript",
          value: "typescript",
          checked: typescript
        },
        {
          name: "ESLint",
          value: "eslint",
          checked: eslint
        }
      ]
    }
  ];
};

let baseOpts: baseOpt = {
  projectName: "",
  description: "",
  author: "",
  version: "",
  license: "",
  gitinit: false,

  typescript: false,
  eslint: false
};
program.version(_package.version); // package.json 中的版本号

/**
 * @todoa add prompt and chalk
 */
program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Skip prompts and use default preset", false)
  .option("-gi, --gitinit", "Initialize git repo", false)
  .option("-a, --author <author>", "Author username for git", false)
  .action(async (projectName: string, options: { author: string; default: boolean; gitinit: boolean }) => {
    const author = (options.author ? options.author : getGitInfo("author")) || "";

    if (options.default) {
      font.blue("You are using the default preset.");
      baseOpts.author = author;
      baseOpts.projectName = projectName;
      baseOpts.gitinit = options.gitinit;
      generateDir(baseOpts);
      return;
    }

    const info: IInitOpt = await inquirer.prompt(projectInfo(projectName, author));
    // console.log(info);
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

    generateDir(baseOpts);
  });

program.parse(process.argv);
export default program;
