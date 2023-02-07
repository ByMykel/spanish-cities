"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const autonomies_1 = require("./autonomies");
const cities_1 = require("./cities");
const test = ({ name, fn, }) => {
    console.log(`Testing: ${name}`);
    fn();
};
console.log('Testing autonomies.ts:');
test({
    name: 'should return an array of autonomies',
    fn: () => {
        const result = (0, autonomies_1.autonomies)();
        (0, assert_1.default)(Array.isArray(result));
        assert_1.default.strictEqual(result[0].code, '01');
        assert_1.default.strictEqual(result[0].name, 'Andalucía');
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
    name: 'should return autonomy of Cataluña when code is 09',
    fn: () => {
        const result = (0, autonomies_1.autonomies)({ code: '11' });
        assert_1.default.strictEqual(result[0].code, '11');
        assert_1.default.strictEqual(result[0].name, 'Extremadura');
    },
});
test({
    name: 'should return empty array when code is 99',
    fn: () => {
        const result = (0, autonomies_1.autonomies)({ code: '99' });
        assert_1.default.strictEqual(result.length, 0);
    }
});
console.log('Testing cities.ts:');
test({
    name: 'should return an array of cities',
    fn: () => {
        const result = (0, cities_1.cities)();
        (0, assert_1.default)(Array.isArray(result));
        (0, assert_1.default)(result[0].code_autonomous_community);
        (0, assert_1.default)(result[0].code_province);
        (0, assert_1.default)(result[0].code_municipality);
        (0, assert_1.default)(result[0].extra_digit);
        (0, assert_1.default)(result[0].name);
    }
});
test({
    name: 'should return an array with 8129 items',
    fn: () => {
        const result = (0, cities_1.cities)();
        assert_1.default.strictEqual(result.length, 8131);
    }
});
test({
    name: 'should return 179 cities of Madrid when code_autonomous_community is 13',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: '13' });
        assert_1.default.strictEqual(result[0].code_autonomous_community, '13');
        assert_1.default.strictEqual(result.length, 179);
    }
});
test({
    name: 'should return 179 cities of Madrid when code_autonomous_community is 13 and code_province is 30',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: '13', code_province: '28' });
        assert_1.default.strictEqual(result[0].code_autonomous_community, '13');
        assert_1.default.strictEqual(result[0].code_province, '28');
        assert_1.default.strictEqual(result.length, 179);
    }
});
test({
    name: 'should return 1 city of Madrid when code_autonomous_community is 13 and code_province is 30 and code_municipality is 79',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: '13', code_province: '28', code_municipality: '001' });
        assert_1.default.strictEqual(result[0].code_autonomous_community, '13');
        assert_1.default.strictEqual(result[0].code_province, '28');
        assert_1.default.strictEqual(result[0].code_municipality, '001');
        assert_1.default.strictEqual(result.length, 1);
    }
});
test({
    name: 'should return 1 city of Madrid when code_autonomous_community is 13 and code_province is 30 and code_municipality is 79 and extra_digit is 4',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: '13', code_province: '28', code_municipality: '001', extra_digit: '4' });
        assert_1.default.strictEqual(result[0].code_autonomous_community, '13');
        assert_1.default.strictEqual(result[0].code_province, '28');
        assert_1.default.strictEqual(result[0].code_municipality, '001');
        assert_1.default.strictEqual(result[0].extra_digit, '4');
        assert_1.default.strictEqual(result.length, 1);
    }
});
test({
    name: 'should return empty array when code_autonomous_community is DOES_NOT_EXIST',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: 'DOES_NOT_EXIST' });
        assert_1.default.strictEqual(result.length, 0);
    }
});
test({
    name: 'should return empty array when code_autonomous_community is 13 and code_province is DOES_NOT_EXIST',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: '13', code_province: 'DOES_NOT_EXIST' });
        assert_1.default.strictEqual(result.length, 0);
    }
});
test({
    name: 'should return empty array when code_autonomous_community is 13 and code_province is 30 and code_municipality is DOES_NOT_EXIST',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: '13', code_province: '28', code_municipality: 'DOES_NOT_EXIST' });
        assert_1.default.strictEqual(result.length, 0);
    }
});
test({
    name: 'should return empty array when code_autonomous_community is 13 and code_province is 30 and code_municipality is 79 and extra_digit is DOES_NOT_EXIST',
    fn: () => {
        const result = (0, cities_1.cities)({ code_autonomous_community: '13', code_province: '28', code_municipality: '001', extra_digit: 'DOES_NOT_EXIST' });
        assert_1.default.strictEqual(result.length, 0);
    }
});
