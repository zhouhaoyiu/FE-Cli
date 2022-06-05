import { tsconfigDefault, MITLicense } from "./tplText";

const tsconfigTemplate = {
  default: tsconfigDefault
};

const getLicensrTemplate = (license: string) => {
  switch (license) {
    case "MIT":
      return MITLicense;
  }
};

export { tsconfigTemplate, getLicensrTemplate };
