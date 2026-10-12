import execa from "execa";

async function run(command: string, args: string[], options: { cwd?: string } = {}): Promise<unknown> {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }
  return execa(command, args, options);
}

export { run };
