# FE-CLI

Create a Node.js, React, Vue 3 or vanilla web project in JavaScript or TypeScript. Requires Node.js 22.12 or newer; Git is required for `--gitinit`.

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

# Vite web projects, with optional ESLint and a complete license
fe init my-react-app --template react-ts --eslint --license MIT
fe init my-vue-app --template vue
fe init my-web-app --template vanilla-ts

# Create a Git repository and its initial commit
fe init my-project -d --gitinit

fe init --help
```

`fe template` lists the built-in templates:

| JavaScript | TypeScript | Generated project |
| --- | --- | --- |
| `js` | `ts` | Node.js console example, nodemon watcher and smoke test |
| `react` | `react-ts` | React with Vite |
| `vue` | `vue-ts` | Vue 3 with Vite |
| `vanilla` | `vanilla-ts` | Browser HTML/CSS/JavaScript with Vite |

Plain `fe init name` prompts for project metadata, template and ESLint. `-d` keeps the Node.js JavaScript default; `--template` chooses a template without prompts. Unsupported names fail before creating a project. The web templates include a working counter and a stylesheet. Their dependency versions are pinned together in the template registry and checked by integration tests; `npm install` creates a project lockfile.

`--author` sets the package author and fills copyright-holder placeholders in license templates. Git commits use your existing Git identity and signing configuration. Git initialization clears inherited repository location, index and object-store variables and explicitly targets the generated `.git` directory.

If the target exists, FE-CLI asks before replacing it. The default answer is no, which cancels creation. Generation and Git initialization finish before replacement begins. Failed generation leaves the existing project intact and returns a nonzero exit code. If replacement fails, FE-CLI attempts to restore the previous project; a failed restore reports the retained backup location.

## Run a generated project

```shell
cd my-project
npm install
npm run dev
```

For Node.js templates, the example prints `hello world`; nodemon restarts it when source files change. TypeScript compiles to `dist` before running or restarting.

```shell
# TypeScript projects: compile before the first standalone start
npm run build

# Run once
npm start

# Run the generated smoke test; TypeScript is compiled automatically
npm test
```

For web templates, `npm run dev` starts Vite and prints the local URL. `npm run build` creates `dist`; `npm run preview` serves that build locally. TypeScript builds check types before bundling, using `vue-tsc` for Vue single-file components and `tsc` for React and vanilla projects. Web starters do not include an application test runner.

## ESLint and licenses

Select ESLint in the prompts or pass `--eslint` to generate `eslint.config.mjs`, the required dependencies and `npm run lint`. JavaScript, TypeScript, JSX and Vue single-file components receive the matching parser and rules. ESLint is optional for all templates.

`--license` accepts `MIT`, `Apache-2.0`, `GPL-3.0-only`, `BSD-3-Clause` or `ISC`. Interactive choices use the same identifiers. FE-CLI writes the full selected text and the same identifier to `package.json`; the author and current year replace the license's copyright placeholders. With no author, these placeholders use `Project contributors`. Omitting the option in non-interactive mode, or choosing `skip`, leaves out the LICENSE file. Ambiguous names such as `GPL`, `Apache` and `BSD` are rejected. The bundled texts and pinned upstream hashes are in `src/bin/generateDir/licenses`.

## Develop and test FE-CLI

```shell
pnpm run dev        # Recompile the CLI when its TypeScript source changes
pnpm run prod:test  # Compile once, including committed JavaScript and declarations
pnpm run lint
pnpm test
pnpm run format
```

Tests use temporary directories and isolated Git configuration. They exercise interactive choices, all eight templates, ESLint success and rejection, TypeScript error rejection, development-server responses after source edits, production build/preview, production-only CLI installation, initial Git commits, foreign Git environment isolation, complete license output, overwrite decisions and failure recovery. Node.js templates also run and reload their console example. The integration tests install npm packages and require registry access. They do not run `npm link` or change global Git settings.

The web templates use the [Vite](https://vite.dev/guide/) build and development APIs with small original examples. Template integration tests inspect HTTP responses and generated assets; browser interaction should also be checked when changing a starter's UI.
