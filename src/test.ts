import assert from 'assert';
import { Autonomy, autonomies } from './autonomies';
import { City, cities } from './cities';

const test = ({ name, fn, }: { name: string; fn: () => void }) => {
  console.log(`Testing: ${name}`);
  fn();
};

console.log('Testing autonomies.ts:');

test({
  name: 'should return an array of autonomies',
  fn: () => {
    const result = autonomies();

    assert(Array.isArray(result));

    assert.strictEqual((<Autonomy[]>result)[0].code, '01');
    assert.strictEqual((<Autonomy[]>result)[0].name, 'Andalucía');
  },
});

test({
  name: 'should return an array with 19 items',
  fn: () => {
    const result = autonomies();

    assert.strictEqual((<Autonomy[]>result).length, 19);
  },
});

test({
  name: 'should return autonomy of Cataluña when code is 09',
  fn: () => {
    const result = autonomies({ code: '11' });

    assert.strictEqual((<Autonomy[]>result)[0].code, '11');
    assert.strictEqual((<Autonomy[]>result)[0].name, 'Extremadura');
  },
});

test({
  name: 'should return empty array when code is 99',
  fn: () => {
    const result = autonomies({ code: '99' });

    assert.strictEqual((<Autonomy[]>result).length, 0);
  }
});

console.log('Testing cities.ts:');

test({
  name: 'should return an array of cities',
  fn: () => {
    const result = cities();

    assert(Array.isArray(result));

    assert((<City[]>result)[0].code_autonomous_community);
    assert((<City[]>result)[0].code_province);
    assert((<City[]>result)[0].code_municipality);
    assert((<City[]>result)[0].extra_digit);
    assert((<City[]>result)[0].name);
  }
});

test({
  name: 'should return an array with 8129 items',
  fn: () => {
    const result = cities();

    assert.strictEqual((<City[]>result).length, 8131);
  }
});

test({
  name: 'should return 179 cities of Madrid when code_autonomous_community is 13',
  fn: () => {
    const result = cities({ code_autonomous_community: '13' });

    assert.strictEqual((<City[]>result)[0].code_autonomous_community, '13');
    assert.strictEqual((<City[]>result).length, 179);
  }
});

test({
  name: 'should return 179 cities of Madrid when code_autonomous_community is 13 and code_province is 30',
  fn: () => {
    const result = cities({ code_autonomous_community: '13', code_province: '28' });

    assert.strictEqual((<City[]>result)[0].code_autonomous_community, '13');
    assert.strictEqual((<City[]>result)[0].code_province, '28');
    assert.strictEqual((<City[]>result).length, 179);
  }
});

test({
  name: 'should return 1 city of Madrid when code_autonomous_community is 13 and code_province is 30 and code_municipality is 79',
  fn: () => {
    const result = cities({ code_autonomous_community: '13', code_province: '28', code_municipality: '001' });

    assert.strictEqual((<City[]>result)[0].code_autonomous_community, '13');
    assert.strictEqual((<City[]>result)[0].code_province, '28');
    assert.strictEqual((<City[]>result)[0].code_municipality, '001');
    assert.strictEqual((<City[]>result).length, 1);
  }
});

test({
  name: 'should return 1 city of Madrid when code_autonomous_community is 13 and code_province is 30 and code_municipality is 79 and extra_digit is 4',
  fn: () => {
    const result = cities({ code_autonomous_community: '13', code_province: '28', code_municipality: '001', extra_digit: '4' });

    assert.strictEqual((<City[]>result)[0].code_autonomous_community, '13');
    assert.strictEqual((<City[]>result)[0].code_province, '28');
    assert.strictEqual((<City[]>result)[0].code_municipality, '001');
    assert.strictEqual((<City[]>result)[0].extra_digit, '4');
    assert.strictEqual((<City[]>result).length, 1);
  }
});

test({
  name: 'should return empty array when code_autonomous_community is DOES_NOT_EXIST',
  fn: () => {
    const result = cities({ code_autonomous_community: 'DOES_NOT_EXIST' });

    assert.strictEqual((<City[]>result).length, 0);
  }
});

test({
  name: 'should return empty array when code_autonomous_community is 13 and code_province is DOES_NOT_EXIST',
  fn: () => {
    const result = cities({ code_autonomous_community: '13', code_province: 'DOES_NOT_EXIST' });

    assert.strictEqual((<City[]>result).length, 0);
  }
});

test({
  name: 'should return empty array when code_autonomous_community is 13 and code_province is 30 and code_municipality is DOES_NOT_EXIST',
  fn: () => {
    const result = cities({ code_autonomous_community: '13', code_province: '28', code_municipality: 'DOES_NOT_EXIST' });

    assert.strictEqual((<City[]>result).length, 0);
  }
});

test({
  name: 'should return empty array when code_autonomous_community is 13 and code_province is 30 and code_municipality is 79 and extra_digit is DOES_NOT_EXIST',
  fn: () => {
    const result = cities({ code_autonomous_community: '13', code_province: '28', code_municipality: '001', extra_digit: 'DOES_NOT_EXIST' });

    assert.strictEqual((<City[]>result).length, 0);
  }
});
