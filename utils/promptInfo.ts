const projectInfo = (projectName: string, author: string) => {
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

const dependenciesInfo = ({ typescript, eslint }: { typescript: boolean; eslint: boolean }) => {
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

export { projectInfo, dependenciesInfo, Lisence };
