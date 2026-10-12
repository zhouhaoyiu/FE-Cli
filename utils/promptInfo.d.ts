declare const projectInfo: (projectName: string, author: string, license?: string) => ({
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
    default: string;
})[];
declare const Lisence: {
    name: string;
    value: string;
}[];
declare const dependenciesInfo: ({ eslint }: {
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
