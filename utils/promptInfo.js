"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lisence = exports.dependenciesInfo = exports.projectInfo = void 0;
const projectInfo = (projectName, author) => {
    return [
        {
            type: "input",
            name: "projectName",
            message: "Project name",
            default: projectName
        },
        {
            type: "input",
            name: "description",
            message: "Project description",
            default: "A project created by" + author
        },
        {
            type: "input",
            name: "author",
            message: "Author",
            default: author
        },
        {
            type: "input",
            name: "version",
            message: "Version",
            default: "1.0.0"
        },
        {
            type: "list",
            name: "license",
            message: "License",
            choices: Lisence
        }
    ];
};
exports.projectInfo = projectInfo;
const Lisence = [
    {
        name: "MIT",
        value: "MIT"
    },
    {
        name: "Apache",
        value: "Apache"
    },
    {
        name: "GPL",
        value: "GPL"
    },
    {
        name: "BSD",
        value: "BSD"
    },
    {
        name: "ISC",
        value: "ISC"
    },
    {
        name: "skip",
        value: ""
    }
];
exports.Lisence = Lisence;
const dependenciesInfo = ({ typescript, eslint }) => {
    return [
        {
            type: "checkbox",
            name: "dependencies",
            message: "Which dependencies do you want to add?",
            choices: [
                {
                    name: "TypeScript",
                    value: "typescript",
                    checked: typescript
                },
                {
                    name: "ESLint",
                    value: "eslint",
                    checked: eslint
                }
            ]
        }
    ];
};
exports.dependenciesInfo = dependenciesInfo;
