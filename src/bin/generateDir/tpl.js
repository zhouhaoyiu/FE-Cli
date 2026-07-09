"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicensrTemplate = exports.tsconfigTemplate = void 0;
const tplText_1 = require("./tplText");
const tsconfigTemplate = {
    default: tplText_1.tsconfigDefault
};
exports.tsconfigTemplate = tsconfigTemplate;
const getLicensrTemplate = (license) => {
    switch (license) {
        case "MIT":
            return tplText_1.MITLicense;
    }
};
exports.getLicensrTemplate = getLicensrTemplate;
