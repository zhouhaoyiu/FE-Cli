"use strict";
exports.__esModule = true;
function generatePackagejson(projectName, author, description, version, license) {
    var packagejson = {
        name: projectName,
        main: "index.js",
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
    return packagejson;
}
exports["default"] = generatePackagejson;
