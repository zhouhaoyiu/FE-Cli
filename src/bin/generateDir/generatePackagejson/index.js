"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templates_1 = require("../../templates");
function generatePackagejson({ projectName, author, description, version, license, typescript, eslint, template: templateName }) {
    const template = (0, templates_1.getTemplate)(templateName !== null && templateName !== void 0 ? templateName : (typescript ? "ts" : "js"));
    typescript = template.typescript;
    let packagejson = {
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
        packagejson.devDependencies["typescript"] = templates_1.versions.typescript;
        packagejson.devDependencies["@types/node"] = templates_1.versions.nodeTypes;
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
        packagejson.devDependencies = { vite: templates_1.versions.vite };
        if (typescript)
            packagejson.devDependencies.typescript = templates_1.versions.typescript;
        if (template.framework === "react") {
            packagejson.dependencies = { react: templates_1.versions.react, "react-dom": templates_1.versions.react };
            packagejson.devDependencies["@vitejs/plugin-react"] = templates_1.versions.reactPlugin;
            if (typescript) {
                packagejson.devDependencies["@types/react"] = templates_1.versions.reactTypes;
                packagejson.devDependencies["@types/react-dom"] = templates_1.versions.reactTypes;
            }
        }
        if (template.framework === "vue") {
            packagejson.dependencies.vue = templates_1.versions.vue;
            packagejson.devDependencies["@vitejs/plugin-vue"] = templates_1.versions.vuePlugin;
            if (typescript)
                packagejson.devDependencies["vue-tsc"] = templates_1.versions.vueTsc;
        }
    }
    if (eslint) {
        Object.assign(packagejson.devDependencies, { eslint: templates_1.versions.eslint, "@eslint/js": templates_1.versions.eslint, globals: templates_1.versions.globals });
        if (typescript)
            packagejson.devDependencies["typescript-eslint"] = templates_1.versions.typescriptEslint;
        if (template.framework === "react")
            packagejson.devDependencies["eslint-plugin-react"] = "7.37.5";
        if (template.framework === "vue")
            packagejson.devDependencies["eslint-plugin-vue"] = templates_1.versions.vueEslint;
        packagejson.scripts.lint = "eslint . --max-warnings 0";
    }
    packagejson.engines = { node: ">=22.12.0" };
    return packagejson;
}
exports.default = generatePackagejson;
