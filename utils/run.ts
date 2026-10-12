import execa from "execa";

async function run(command: string, args: string[], options: { cwd?: string; env?: NodeJS.ProcessEnv; extendEnv?: boolean } = {}): Promise<{ stdout: string }> {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }
  return execa(command, args, options);
}

function isolatedGitEnvironment(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  // Keep identity, signing, global/system configuration and executable lookup.
  // Repository location/index/object variables must not escape into a new project.
  for (const name of [
    "GIT_DIR",
    "GIT_WORK_TREE",
    "GIT_COMMON_DIR",
    "GIT_INDEX_FILE",
    "GIT_OBJECT_DIRECTORY",
    "GIT_ALTERNATE_OBJECT_DIRECTORIES",
    "GIT_GRAFT_FILE",
    "GIT_SHALLOW_FILE",
    "GIT_PREFIX",
    "GIT_INTERNAL_SUPER_PREFIX",
    "GIT_CONFIG",
    "GIT_IMPLICIT_WORK_TREE",
    "GIT_CEILING_DIRECTORIES",
    "GIT_DISCOVERY_ACROSS_FILESYSTEM",
    "GIT_NAMESPACE",
    "GIT_QUARANTINE_PATH"
  ])
    delete env[name];
  return env;
}

export { run, isolatedGitEnvironment };
