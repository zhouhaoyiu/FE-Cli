# FE-CLI

Create a JavaScript or TypeScript project with a runnable example, a development watcher and a smoke test. Requires Node.js 22.12 or newer; Git is required for `--gitinit`.

## Use

From a checkout:

```shell
pnpm install --frozen-lockfile
pnpm run prod:test
npm link

# Interactive project options
fe init my-project

# Default JavaScript project
fe init my-project -d

# Choose a template without project-option prompts
fe init my-project --template js
fe init my-project --template ts

# Create a Git repository and its initial commit
fe init my-project -d --gitinit

fe init --help
```

`js` and `ts` are the supported templates. Other template names return an error. `--author` sets the author in the generated `package.json`; Git commits use your existing Git identity and configuration.

If the target exists, FE-CLI asks before replacing it. The default answer is no, which cancels creation. Generation and Git initialization finish before replacement begins. Failed generation leaves the existing project intact and returns a nonzero exit code. If replacement fails, FE-CLI attempts to restore the previous project; a failed restore reports the retained backup location.

## Run a generated project

```shell
cd my-project
npm install
npm run dev
```

The example prints `hello world`. The development watcher restarts it when source files change. TypeScript projects compile to `dist` before running or restarting.

```shell
# TypeScript projects: compile before the first standalone start
npm run build

# Run once
npm start

# Run the generated smoke test; TypeScript is compiled automatically
npm test
```

## Develop and test FE-CLI

```shell
pnpm run dev        # Recompile the CLI when its TypeScript source changes
pnpm run prod:test  # Compile once, including committed JavaScript and declarations
pnpm run lint
pnpm test
pnpm run format
```

Tests use temporary directories and isolated Git configuration. They exercise interactive initialization, both templates, installation with production dependencies, startup, source reloads, initial Git commits, overwrite decisions and failure recovery. The integration tests install npm packages and require registry access. They do not run `npm link` or change global Git settings.
