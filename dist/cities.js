"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCities = void 0;
const data_js_1 = __importDefault(require("./data.js"));
const filterCities = (item, filters) => {
    const { code_autonomous_community, code_province, code_municipality, extra_digit, } = filters;
    const options = [];
    if (code_autonomous_community !== undefined) {
        options.push({ code_autonomous_community });
    }
    if (code_province !== undefined) {
        options.push({ code_province });
    }
    if (code_municipality !== undefined) {
        options.push({ code_municipality });
    }
    if (extra_digit !== undefined) {
        options.push({ extra_digit });
    }
    return options.every((option) => {
        const key = Object.keys(option)[0];
        return item[key] == option[key];
    });
};
const getCities = (filters) => {
    return data_js_1.default.cities.filter((item) => filterCities(item, filters));
};
exports.getCities = getCities;
