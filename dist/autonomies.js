"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autonomies = void 0;
const data_1 = __importDefault(require("./data"));
const autonomies = (options = {}) => {
    const { code } = options;
    const filteredAutonomies = code !== undefined
        ? data_1.default.autonomies.filter((item) => item.code == code)
        : data_1.default.autonomies;
    return filteredAutonomies;
};
exports.autonomies = autonomies;
