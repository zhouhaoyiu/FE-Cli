declare function generatePackagejson(name: string, author?: string): IPackagejson;
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
