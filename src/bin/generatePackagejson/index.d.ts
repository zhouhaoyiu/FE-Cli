declare function generatePackagejson({ projectName, author, description, version, license, typescript, eslint }: IPackageParams): Record<string, any>;
interface IPackageParams {
    projectName: string;
    author: string;
    description: string;
    version: string;
    license: string;
    typescript: boolean;
    eslint: boolean;
}
export default generatePackagejson;
