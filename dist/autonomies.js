"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autonomies = void 0;
const data_1 = __importDefault(require("./data"));
const autonomies = (options = {}) => {
    var _a;
    const { with_code, code } = options;
    if (code !== undefined && typeof code !== "number" && typeof code !== "string") {
        throw new Error("The code must be a string or a number");
    }
    if (code !== undefined) {
        const autonomy = data_1.default.autonomies.find((item) => item.code == code);
        if (with_code === true) {
            return autonomy;
        }
        return (_a = autonomy === null || autonomy === void 0 ? void 0 : autonomy.name) !== null && _a !== void 0 ? _a : undefined;
    }
    if (with_code === true) {
        return data_1.default.autonomies;
    }
    return data_1.default.autonomies.map((item) => item.name);
};
exports.autonomies = autonomies;
