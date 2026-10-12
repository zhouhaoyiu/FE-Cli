function generatePackagejson({ projectName, author, description, version, license, typescript }: IPackageParams): IPackagejson {
  let packagejson: IPackagejson = {
    name: projectName,
    main: typescript ? "dist/index.js" : "src/index.js",
    type: "commonjs",
    author: author,
    description,
    version,
    license,
    scripts: {
      test: "node --test test/*.test.js",
      start: "node src/index.js",
      dev: "nodemon src/index.js"
    },
    dependencies: {},
    devDependencies: { nodemon: "^3.1.14" }
  };
  if (typescript) {
    packagejson.devDependencies["typescript"] = "4.7.2";
    packagejson.scripts.build = "tsc -p tsconfig.json";
    packagejson.scripts.start = "node dist/index.js";
    packagejson.scripts.dev = 'nodemon --watch src --ext ts --exec "npm run build && npm start"';
    packagejson.scripts.test = "npm run build && node --test test/*.test.js";
  }
  return packagejson;
}
interface IPackageParams {
  projectName: string;
  author: string;
  description: string;
  version: string;
  license: string;
  typescript: boolean;
  eslint: boolean;
}
interface IPackagejson {
  description: string;
  name: string;
  version: string;
  main: string;
  type: string;
  scripts: Record<string, string>;
  author: string;
  license: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export default generatePackagejson;
