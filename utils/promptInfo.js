"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lisence = exports.dependenciesInfo = exports.projectInfo = void 0;
const templates_1 = require("../src/bin/templates");
const license_1 = require("../src/bin/generateDir/license");
const projectInfo = (projectName, author, license) => {
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
            choices: Lisence,
            default: license !== null && license !== void 0 ? license : "MIT"
        },
        {
            type: "list",
            name: "template",
            message: "Project template",
            choices: templates_1.templateNames.map(value => ({ name: templates_1.templates[value].name, value })),
            default: "js"
        }
    ];
};
exports.projectInfo = projectInfo;
const Lisence = [
    ...license_1.licenseNames.map(value => ({ name: value, value })),
    {
        name: "skip",
        value: ""
    }
];
exports.Lisence = Lisence;
const dependenciesInfo = ({ eslint }) => {
    return [
        {
            type: "checkbox",
            name: "dependencies",
            message: "Which dependencies do you want to add?",
            choices: [
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
