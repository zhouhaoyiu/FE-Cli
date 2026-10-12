import { templates, templateNames } from "../src/bin/templates";
import { licenseNames } from "../src/bin/generateDir/license";

const projectInfo = (projectName: string, author: string, license?: string) => {
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
      default: license ?? "MIT"
    },
    {
      type: "list",
      name: "template",
      message: "Project template",
      choices: templateNames.map(value => ({ name: templates[value].name, value })),
      default: "js"
    }
  ];
};
const Lisence = [
  ...licenseNames.map(value => ({ name: value, value })),
  {
    name: "skip",
    value: ""
  }
];

const dependenciesInfo = ({ eslint }: { eslint: boolean }) => {
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

export { projectInfo, dependenciesInfo, Lisence };
