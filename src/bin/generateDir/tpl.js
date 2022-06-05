"use strict";
exports.__esModule = true;
exports.getLicensrTemplate = exports.tsconfigTemplate = void 0;
var tplText_1 = require("./tplText");
var tsconfigTemplate = {
    "default": tplText_1.tsconfigDefault
};
exports.tsconfigTemplate = tsconfigTemplate;
var getLicensrTemplate = function (license) {
    switch (license) {
        case "MIT":
            return tplText_1.MITLicense;
    }
};
exports.getLicensrTemplate = getLicensrTemplate;
