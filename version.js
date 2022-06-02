const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const { getGitInfo } = require("./src");

const mode = process.argv[2];

const commiter = getGitInfo("name");

const enumMode = ["small", "middle", "big"];

const packagePath = path.resolve(__dirname, "package.json");
const packageJson = fs.readFileSync(packagePath, "utf-8");
const packageObj = JSON.parse(packageJson);

if (!mode || !enumMode.includes(mode)) {
  console.log("请输入模式：small middle big");
} else {
  updateVersion(mode);
}

function updateVersion(mode) {
  // 得到当前的版本号
  const currentVersion = getCurrentVersion();
  const arr = currentVersion.split(".");
  let newVersion = "";

  if (mode === "small") {
    // 小版本更新
    arr[2] = parseInt(arr[2]) + 1;
    newVersion = arr.join(".");
  } else if (mode === "middle") {
    // 中版本更新
    const arr = currentVersion.split(".");
    arr[1] = parseInt(arr[1]) + 1;
    arr[2] = 0;
    newVersion = arr.join(".");
  } else if (mode === "big") {
    // 大版本更新
    const arr = currentVersion.split(".");
    arr[0] = parseInt(arr[0]) + 1;
    arr[1] = 0;
    arr[2] = 0;
    newVersion = arr.join(".");
  }
  updatePackageJson(newVersion);
  updateChangeLog(newVersion);
}

function getCurrentVersion() {
  return packageObj.version;
}

function updatePackageJson(newVersion) {
  console.log("FE-CLI has been updated to version " + newVersion);
  packageObj.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageObj, null, 2));
}

function updateChangeLog(newVersion) {
  console.log(123);
  const changeLogPath = path.resolve(__dirname, "CHANGELOG.md");
  const changeLog = fs.readFileSync(changeLogPath, "utf-8");
  /*
  ## 0.0.1 (2022-06-02) - Initial Release
  #### Committers: zhouhaoyu
  */
  const newChangeLogText = `## ${newVersion} (${dayjs().format("YYYY-MM-DD")})\n` + "\n" + `#### Committer: ${commiter}\n` + changeLog;
  fs.writeFileSync(changeLogPath, newChangeLogText);
}
