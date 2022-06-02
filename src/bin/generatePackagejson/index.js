"use strict";
exports.__esModule = true;
function generatePackagejson(name, author) {
  if (author === void 0) {
    author = "";
  }
  var packagejson = {
    name: name,
    version: "0.0.1",
    description: "",
    main: "index.js",
    author: author,
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    keywords: [],
    dependencies: {},
    devDependencies: {}
  };
  return packagejson;
}
exports["default"] = generatePackagejson;
