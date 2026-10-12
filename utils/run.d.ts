declare function run(command: string, args: string[], options?: {
    cwd?: string;
}): Promise<unknown>;
export { run };
