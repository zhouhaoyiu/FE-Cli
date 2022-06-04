function generatePackagejson({ projectName, author, description, version, license, typescript, eslint }: IPackageParams): Record<string, any> {
  let packagejson: IPackagejson = {
    name: projectName,
    main: typescript ? "src/main.ts" : "src/main.js",
    author: author,
    description,
    version,
    license,
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
  scripts: Record<string, string>;
  author: string;
  license: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export default generatePackagejson;
