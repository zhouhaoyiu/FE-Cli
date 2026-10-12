"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versions = exports.templateNames = exports.templates = void 0;
exports.getTemplate = getTemplate;
exports.templates = {
    js: { name: "Node.js / JavaScript", framework: "node", typescript: false },
    ts: { name: "Node.js / TypeScript", framework: "node", typescript: true },
    react: { name: "React / JavaScript", framework: "react", typescript: false },
    "react-ts": { name: "React / TypeScript", framework: "react", typescript: true },
    vue: { name: "Vue 3 / JavaScript", framework: "vue", typescript: false },
    "vue-ts": { name: "Vue 3 / TypeScript", framework: "vue", typescript: true },
    vanilla: { name: "Vanilla web / JavaScript", framework: "vanilla", typescript: false },
    "vanilla-ts": { name: "Vanilla web / TypeScript", framework: "vanilla", typescript: true }
};
exports.templateNames = Object.keys(exports.templates);
function getTemplate(name) {
    if (!Object.prototype.hasOwnProperty.call(exports.templates, name)) {
        throw new Error(`Unsupported template: ${name}. Choose ${exports.templateNames.join(", ")}.`);
    }
    return exports.templates[name];
}
// Exact versions are tested together; generated package-lock.json records platform dependencies.
exports.versions = {
    vite: "8.3.4",
    react: "19.3.0",
    vue: "3.5.43",
    reactPlugin: "6.1.2",
    vuePlugin: "6.0.10",
    typescript: "6.0.3",
    vueTsc: "3.3.13",
    nodeTypes: "22.20.5",
    reactTypes: "19.3.0",
    eslint: "9.39.5",
    typescriptEslint: "8.71.1",
    vueEslint: "10.11.1",
    globals: "17.13.0"
};
