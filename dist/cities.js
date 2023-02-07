"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cities = void 0;
const data_1 = __importDefault(require("./data"));
const cities = (options = {}) => {
    const { code_autonomous_community, code_province, code_municipality, extra_digit, } = options;
    return data_1.default.cities.filter((item) => {
        if (code_autonomous_community !== undefined) {
            if (item.code_autonomous_community != code_autonomous_community) {
                return false;
            }
        }
        if (code_province !== undefined) {
            if (item.code_province != code_province) {
                return false;
            }
        }
        if (code_municipality !== undefined) {
            if (item.code_municipality != code_municipality) {
                return false;
            }
        }
        if (extra_digit !== undefined) {
            if (item.extra_digit != extra_digit) {
                return false;
            }
        }
        return true;
    });
};
exports.cities = cities;
