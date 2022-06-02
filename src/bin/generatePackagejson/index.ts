function generatePackagejson(name: string, author = ""): Record<string, any> {
  const packagejson: IPackagejson = {
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

interface IPackagejson {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  author?: string;
  keywords: string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export default generatePackagejson;
