import fs from "fs";
import os from "os";
import path from "path";

function getGitInfo(
  opt
): string {
  // 获得本地git中配置的用户名和邮箱
  const configPath = path.join(os.homedir(), ".gitconfig");
  const config = fs.existsSync(configPath)
    ? fs.readFileSync(configPath, "utf-8")
    : "";
  const user = config.match(/name = (.*)/)[1];
  const email = config.match(/email = (.*)/)[1];
  const author = user && email ? `${user[1]} <${email[1]}>` : "";
  switch (opt) {
    case "user":
      return user;
    case "email":
      return email;
    case "author":
      return author;
    default:
      return config;
  }
}

export default getGitInfo;
