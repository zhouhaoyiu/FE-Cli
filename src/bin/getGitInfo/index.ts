import fs from "fs";
import os from "os";
import path from "path";

function getGitInfo(opt: "name" | "email" | "author" | "config"): string {
  // 获得本地git中配置的用户名和邮箱
  const configPath: string = path.join(os.homedir(), ".gitconfig");
  const config: string = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf-8") : "";

  let name: string = "noname";
  let email: string = "noemail";

  if (config.match(/name = (.*)/) && config.match(/name = (.*)/)!.length > 1) {
    name = config!.match(/name = (.*)/)![1];
  }
  if (config.match(/email = (.*)/) && config.match(/email = (.*)/)!.length > 1) {
    email = config!.match(/email = (.*)/)![1];
  }

  const author: string = name && email ? `${name} <${email}>` : "";
  switch (opt) {
    case "name":
      return name;
    case "email":
      return email;
    case "author":
      return author;
    case "config":
      return config;
  }
}

export default getGitInfo;
