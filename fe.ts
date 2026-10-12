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

const environment =
  process.env.NODE_ENV ??
  (fs.existsSync(".env")
    ? fs
        .readFileSync(".env", "utf-8")
        .match(/^NODE_ENV=(.*)$/m)?.[1]
        ?.trim()
    : undefined);
const DEV = environment === "development";

const program = new Command();
process.argv = process.argv.map(arg => (arg === "-gi" ? "--gitinit" : arg));
program.version(_package.version);

program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Use default project options", false)
  .option("-g, --gitinit", "Initialize git repo", false)
  .option("-a, --author <author>", "Author in package.json")
  .option("-t, --template <template>", "Template name (js or ts)")
  .action(async (projectName: string, options: { author?: string; default: boolean; gitinit: boolean; template?: string }) => {
    const author: string = (options.author ? options.author : getGitInfo("author")) || "";
    if (options.template !== undefined && !["js", "ts"].includes(options.template)) {
      throw new Error(`Unsupported template: ${options.template}. Choose js or ts.`);
    }
    const opts = { ...baseOpts, author, projectName, gitinit: options.gitinit, typescript: options.template === "ts" };
    if (options.default || options.template !== undefined) {
      await generateDir(opts);
      return;
    }

    const info: IInitOpt = await inquirer.prompt(projectInfo(projectName, author));
    Object.assign(opts, info);

    const dependencies = await inquirer.prompt(
      dependenciesInfo({
        typescript: opts.typescript,
        eslint: opts.eslint
      })
    );

    const dependenciesArr = dependencies.dependencies as string[];
    opts.typescript = dependenciesArr.includes("typescript");
    opts.eslint = dependenciesArr.includes("eslint");

    if (DEV) console.log(opts);

    await generateDir(opts);
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
  .action(async () => {
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
        fullTree: true,
        showBundled: true
      }
    );
    console.log(res);
  });
program.command("template").action(() => {
  console.log("-----template-------");
  console.log("js");
  console.log("ts");
});
program.command("*").action(() => {
  console.log("Invalid command");
  program.help();
});

if (require.main === module) {
  program.parseAsync(process.argv).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
export default program;
