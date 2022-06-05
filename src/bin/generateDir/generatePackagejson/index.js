"use strict";
exports.__esModule = true;
function generatePackagejson(_a) {
    var projectName = _a.projectName, author = _a.author, description = _a.description, version = _a.version, license = _a.license, typescript = _a.typescript, eslint = _a.eslint;
    var packagejson = {
        name: projectName,
        main: typescript ? "src/index.ts" : "src/index.js",
        author: author,
        description: description,
        version: version,
        license: license,
        scripts: {
            test: 'echo "Error: no test specified" && exit 1'
        },
        dependencies: {},
        devDependencies: {}
    };
    if (typescript) {
        packagejson.devDependencies["typescript"] = "4.7.2";
    }
    return packagejson;
}
exports["default"] = generatePackagejson;
