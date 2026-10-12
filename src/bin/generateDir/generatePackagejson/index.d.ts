import { TemplateName } from "../../templates";
declare function generatePackagejson({ projectName, author, description, version, license, typescript, eslint, template: templateName }: IPackageParams): IPackagejson;
interface IPackageParams {
    projectName: string;
    author: string;
    description: string;
    version: string;
    license: string;
    typescript: boolean;
    eslint: boolean;
    template?: TemplateName;
}
interface IPackagejson {
    description: string;
    name: string;
    version: string;
    main?: string;
    private?: boolean;
    engines?: Record<string, string>;
    type: string;
    scripts: Record<string, string>;
    author: string;
    license: string;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
}
export default generatePackagejson;
