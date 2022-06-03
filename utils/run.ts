import execa from "execa";

function run(command: string, args: string[]) {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }
  return execa(command, args);
}

export { run };
