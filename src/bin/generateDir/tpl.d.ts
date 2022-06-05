declare const tsconfigTemplate: {
    default: {
        compilerOptions: {
            target: string;
            module: string;
            esModuleInterop: boolean;
            forceConsistentCasingInFileNames: boolean;
            strict: boolean;
            skipLibCheck: boolean;
        };
    };
};
declare const getLicensrTemplate: (license: string) => string;
export { tsconfigTemplate, getLicensrTemplate };
