export declare const templates: {
    readonly js: {
        readonly name: "Node.js / JavaScript";
        readonly framework: "node";
        readonly typescript: false;
    };
    readonly ts: {
        readonly name: "Node.js / TypeScript";
        readonly framework: "node";
        readonly typescript: true;
    };
    readonly react: {
        readonly name: "React / JavaScript";
        readonly framework: "react";
        readonly typescript: false;
    };
    readonly "react-ts": {
        readonly name: "React / TypeScript";
        readonly framework: "react";
        readonly typescript: true;
    };
    readonly vue: {
        readonly name: "Vue 3 / JavaScript";
        readonly framework: "vue";
        readonly typescript: false;
    };
    readonly "vue-ts": {
        readonly name: "Vue 3 / TypeScript";
        readonly framework: "vue";
        readonly typescript: true;
    };
    readonly vanilla: {
        readonly name: "Vanilla web / JavaScript";
        readonly framework: "vanilla";
        readonly typescript: false;
    };
    readonly "vanilla-ts": {
        readonly name: "Vanilla web / TypeScript";
        readonly framework: "vanilla";
        readonly typescript: true;
    };
};
export type TemplateName = keyof typeof templates;
export type Template = (typeof templates)[TemplateName];
export declare const templateNames: TemplateName[];
export declare function getTemplate(name: string): Template;
export declare const versions: {
    readonly vite: "8.3.4";
    readonly react: "19.3.0";
    readonly vue: "3.5.43";
    readonly reactPlugin: "6.1.2";
    readonly vuePlugin: "6.0.10";
    readonly typescript: "6.0.3";
    readonly vueTsc: "3.3.13";
    readonly nodeTypes: "22.20.5";
    readonly reactTypes: "19.3.0";
    readonly eslint: "9.39.5";
    readonly typescriptEslint: "8.71.1";
    readonly vueEslint: "10.11.1";
    readonly globals: "17.13.0";
};
