"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generatePackagejson({ projectName, author, description, version, license, typescript, eslint }) {
    let packagejson = {
        name: projectName,
        main: typescript ? "src/index.ts" : "src/index.js",
        author: author,
        description,
        version,
        license,
        scripts: {
            test: 'echo "Error: no test specified" && exit 1',
            dev: "nodemon src/index.js"
        },
        dependencies: {},
        devDependencies: {}
    };
    if (typescript) {
        packagejson.devDependencies["typescript"] = "4.7.2";
    }
    return packagejson;
}
exports.default = generatePackagejson;
