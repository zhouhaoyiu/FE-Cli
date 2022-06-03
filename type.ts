import { IInitOpt } from "./src/bin/generateDir/utils";

interface IPrompt {
  typescript: boolean;
}

type baseOpt = IInitOpt & IPrompt;

export {
  baseOpt
}