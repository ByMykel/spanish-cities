"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const autonomies_1 = require("./autonomies");
const test = ({ name, fn, }) => {
    console.log(`Testing: ${name}`);
    fn();
};
test({
    name: 'should return an array',
    fn: () => {
        const result = (0, autonomies_1.autonomies)();
        (0, assert_1.default)(Array.isArray(result));
    },
});
test({
    name: 'should return an array with 19 items',
    fn: () => {
        const result = (0, autonomies_1.autonomies)();
        assert_1.default.strictEqual(result.length, 19);
    },
});
test({
    name: 'should return an array of Autonomies with code and name',
    fn: () => {
        const result = (0, autonomies_1.autonomies)({ with_code: true });
        (0, assert_1.default)(Array.isArray(result));
        assert_1.default.strictEqual(result[0].code, '01');
        assert_1.default.strictEqual(result[0].name, 'Andalucía');
    },
});
test({
    name: 'should return Extremadura when code is 11',
    fn: () => {
        const result = (0, autonomies_1.autonomies)({ code: '11' });
        assert_1.default.strictEqual(result, 'Extremadura');
    },
});
test({
    name: 'should return Autonomy of Cataluña when code is 09 and with_code is true',
    fn: () => {
        const result = (0, autonomies_1.autonomies)({ code: '11', with_code: true });
        assert_1.default.strictEqual(result.code, '11');
        assert_1.default.strictEqual(result.name, 'Extremadura');
    },
});
test({
    name: 'should return undefined when code is 99',
    fn: () => {
        const result = (0, autonomies_1.autonomies)({ code: '99' });
        assert_1.default.strictEqual(result, undefined);
    }
});
test({
    name: 'should return undefined when code is 99',
    fn: () => {
        const result = (0, autonomies_1.autonomies)({ code: '99', with_code: true });
        assert_1.default.strictEqual(result, undefined);
    }
});
test({
    name: 'should throw an error when code is not a string or a number',
    fn: () => {
        // @ts-ignore
        assert_1.default.throws(() => (0, autonomies_1.autonomies)({ code: {} }));
    }
});
