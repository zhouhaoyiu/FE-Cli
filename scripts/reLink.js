const execa = require("execa");
const path = require("path");
const fs = require("fs");

const packagePath = path.resolve(__dirname, "../package.json");
const packageJson = fs.readFileSync(packagePath, "utf-8");
const packageObj = JSON.parse(packageJson);

execa("npm", ["uninstall", "-g", packageObj.name]);
execa("npm", ["unlink", packageObj.name]);
execa("npm", ["link"]);
