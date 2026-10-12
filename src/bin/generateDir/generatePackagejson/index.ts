import { getTemplate, TemplateName, versions } from "../../templates";

function generatePackagejson({ projectName, author, description, version, license, typescript, eslint, template: templateName }: IPackageParams): IPackagejson {
  const template = getTemplate(templateName ?? (typescript ? "ts" : "js"));
  typescript = template.typescript;
  let packagejson: IPackagejson = {
    name: projectName,
    main: typescript ? "dist/index.js" : "src/index.js",
    type: "commonjs",
    author: author,
    description,
    version,
    license,
    scripts: {
      test: "node --test test/*.test.js",
      start: "node src/index.js",
      dev: "nodemon src/index.js"
    },
    dependencies: {},
    devDependencies: { nodemon: "^3.1.14" }
  };
  if (typescript) {
    packagejson.devDependencies["typescript"] = versions.typescript;
    packagejson.devDependencies["@types/node"] = versions.nodeTypes;
    packagejson.scripts.build = "tsc -p tsconfig.json";
    packagejson.scripts.start = "node dist/index.js";
    packagejson.scripts.dev = 'nodemon --watch src --ext ts --exec "npm run build && npm start"';
    packagejson.scripts.test = "npm run build && node --test test/*.test.js";
  }
  if (template.framework !== "node") {
    packagejson.private = true;
    packagejson.type = "module";
    delete packagejson.main;
    const checker = template.framework === "vue" ? "vue-tsc --noEmit" : "tsc --noEmit";
    packagejson.scripts = {
      dev: "vite",
      build: typescript ? `${checker} && vite build` : "vite build",
      preview: "vite preview",
      ...(typescript ? { "type-check": checker } : {})
    };
    packagejson.devDependencies = { vite: versions.vite };
    if (typescript) packagejson.devDependencies.typescript = versions.typescript;
    if (template.framework === "react") {
      packagejson.dependencies = { react: versions.react, "react-dom": versions.react };
      packagejson.devDependencies["@vitejs/plugin-react"] = versions.reactPlugin;
      if (typescript) {
        packagejson.devDependencies["@types/react"] = versions.reactTypes;
        packagejson.devDependencies["@types/react-dom"] = versions.reactTypes;
      }
    }
    if (template.framework === "vue") {
      packagejson.dependencies.vue = versions.vue;
      packagejson.devDependencies["@vitejs/plugin-vue"] = versions.vuePlugin;
      if (typescript) packagejson.devDependencies["vue-tsc"] = versions.vueTsc;
    }
  }
  if (eslint) {
    Object.assign(packagejson.devDependencies, { eslint: versions.eslint, "@eslint/js": versions.eslint, globals: versions.globals });
    if (typescript) packagejson.devDependencies["typescript-eslint"] = versions.typescriptEslint;
    if (template.framework === "react") packagejson.devDependencies["eslint-plugin-react"] = "7.37.5";
    if (template.framework === "vue") packagejson.devDependencies["eslint-plugin-vue"] = versions.vueEslint;
    packagejson.scripts.lint = "eslint . --max-warnings 0";
  }
  packagejson.engines = { node: ">=22.12.0" };
  return packagejson;
}
interface IPackageParams {
  projectName: string;
  author: string;
  description: string;
  version: string;
  license: string;
  typescript: boolean;
  eslint: boolean;
  template?: TemplateName;
}
interface IPackagejson {
  description: string;
  name: string;
  version: string;
  main?: string;
  private?: boolean;
  engines?: Record<string, string>;
  type: string;
  scripts: Record<string, string>;
  author: string;
  license: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export default generatePackagejson;
