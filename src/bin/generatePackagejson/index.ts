function generatePackagejson(projectName: string, author: string, description: string, version: string, license: string): Record<string, any> {
  const packagejson: IPackagejson = {
    name: projectName,
    main: "index.js",
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
  return packagejson;
}

interface IPackagejson {
  description: string;
  name: string;
  version: string;
  main: string;
  scripts: Record<string, string>;
  author: string;
  license: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export default generatePackagejson;
