import assert from 'assert';
import { autonomies } from './autonomies';
import { cities } from './cities';
import { provinces } from './provinces';
import { Autonomy, City, Province } from './types';

const test = ({ name, fn, }: { name: string; fn: () => void }) => {
  console.log(`Testing: ${name}`);
  fn();
};

console.group('Testing autonomies.ts:');

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

test({
  name: 'should return 2 autonomies when name is "tilla"',
  fn: () => {
    const result = autonomies({ name: 'tilla' });

    assert.strictEqual((<Autonomy[]>result).length, 2);
  }
});

console.groupEnd();
console.group('\nTesting provinces.ts:');

test({
  name: 'should return an array of provinces',
  fn: () => {
    const result = provinces();

    assert(Array.isArray(result));

    assert((<Province[]>result)[0].code);
    assert((<Province[]>result)[0].name);
    assert((<Province[]>result)[0].code_autonomy);
  }
});

test({
  name: 'should return an array with 52 items',
  fn: () => {
    const result = provinces();

    assert.strictEqual((<Province[]>result).length, 52);
  }
});

test({
  name: 'should return 1 provinces of Madrid when code_autonomy is 13',
  fn: () => {
    const result = provinces({ code_autonomy: '13' });

    assert.strictEqual((<Province[]>result)[0].code_autonomy, '13');
    assert.strictEqual((<Province[]>result).length, 1);
  }
});

test({
  name: 'should return 1 provinces of Castilla y León when code_autonomy is 07 and code is 09',
  fn: () => {
    const result = provinces({ code_autonomy: '07', code: '09' });

    assert.strictEqual((<Province[]>result)[0].code_autonomy, '07');
    assert.strictEqual((<Province[]>result)[0].code, '09');
    assert.strictEqual((<Province[]>result).length, 1);
  }
});

test({
  name: 'should return 1 provinces when name is "Ri"',
  fn: () => {
    const result = provinces({ name: 'Ri' });

    assert.strictEqual((<Province[]>result).length, 6);
  }
});

console.groupEnd();
console.group('\nTesting cities.ts:');

test({
  name: 'should return an array of cities',
  fn: () => {
    const result = cities();

    assert(Array.isArray(result));

    assert((<City[]>result)[0].code);
    assert((<City[]>result)[0].code_autonomy);
    assert((<City[]>result)[0].code_province);
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
  name: 'should return 179 cities of Madrid when code_autonomy is 13',
  fn: () => {
    const result = cities({ code_autonomy: '13' });

    assert.strictEqual((<City[]>result)[0].code_autonomy, '13');
    assert.strictEqual((<City[]>result).length, 179);
  }
});

test({
  name: 'should return 179 cities of Madrid when code_autonomy is 13 and code_province is 30',
  fn: () => {
    const result = cities({ code_autonomy: '13', code_province: '28' });

    assert.strictEqual((<City[]>result)[0].code_autonomy, '13');
    assert.strictEqual((<City[]>result)[0].code_province, '28');
    assert.strictEqual((<City[]>result).length, 179);
  }
});

test({
  name: 'should return 1 city of Madrid when code_autonomy is 13 and code_province is 30 and code is 280796',
  fn: () => {
    const result = cities({ code_autonomy: '13', code_province: '28', code: '280796' });

    assert.strictEqual((<City[]>result)[0].code_autonomy, '13');
    assert.strictEqual((<City[]>result)[0].code_province, '28');
    assert.strictEqual((<City[]>result).length, 1);
  }
});

test({
  name: 'should return empty array when code_autonomy is DOES_NOT_EXIST',
  fn: () => {
    const result = cities({ code_autonomy: 'DOES_NOT_EXIST' });

    assert.strictEqual((<City[]>result).length, 0);
  }
});

test({
  name: 'should return empty array when code_autonomy is 13 and code_province is DOES_NOT_EXIST',
  fn: () => {
    const result = cities({ code_autonomy: '13', code_province: 'DOES_NOT_EXIST' });

    assert.strictEqual((<City[]>result).length, 0);
  }
});

test({
  name: 'should return 10 cities when name is "Valverde"',
  fn: () => {
    const result = cities({ name: 'Valverde' });

    assert.strictEqual((<City[]>result).length, 25);
  }
});