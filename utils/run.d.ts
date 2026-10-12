declare function run(command: string, args: string[], options?: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    extendEnv?: boolean;
}): Promise<{
    stdout: string;
}>;
declare function isolatedGitEnvironment(): NodeJS.ProcessEnv;
export { run, isolatedGitEnvironment };
