import execa from 'execa';
import fs from 'fs';

// 不输出\377\376

const info = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run build
`.replace(/\r?\n/g, '\n');

//检查是否有.husky/pre-commit文件
if(!fs.existsSync('./.husky/pre-commit')){
    //没有则创建
    execa("npx", ["husky", "add", ".husky/pre-commit", "npm run build"]);
}else{
    //有则覆盖
    fs.writeFileSync('./.husky/pre-commit', info);
}