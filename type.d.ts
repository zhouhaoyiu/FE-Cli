import { IInitOpt } from "./src/bin/generateDir/utils";
interface IPrompt {
    typescript: boolean;
}
declare type baseOpt = IInitOpt & IPrompt;
export { baseOpt };
