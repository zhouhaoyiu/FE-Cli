import { execa } from 'execa';
import fs from 'fs';



const info = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run build
git add .`;

//检查是否有.husky/pre-commit文件
if(!fs.existsSync('./.husky/pre-commit')){
    //没有则创建
    execa("npx", ["husky", "add", ".husky/pre-commit", "npm run build"]);
}else{
    //有则覆盖,使用utf8编码，没有bom头
    fs.writeFileSync('./.husky/pre-commit', info, {encoding: 'utf8', flag: 'w'});
}
