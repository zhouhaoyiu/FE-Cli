declare const projectInfo: (projectName: string, author: string) => ({
    type: string;
    name: string;
    message: string;
    default: string;
    choices?: undefined;
} | {
    type: string;
    name: string;
    message: string;
    choices: {
        name: string;
        value: string;
    }[];
    default?: undefined;
})[];
declare const Lisence: {
    name: string;
    value: string;
}[];
declare const dependenciesInfo: ({ typescript, eslint }: {
    typescript: boolean;
    eslint: boolean;
}) => {
    type: string;
    name: string;
    message: string;
    choices: {
        name: string;
        value: string;
        checked: boolean;
    }[];
}[];
export { projectInfo, dependenciesInfo, Lisence };
