import assert from 'assert';
import { Autonomy, autonomies } from './autonomies';

const test = ({ name, fn, }: { name: string; fn: () => void }) => {
  console.log(`Testing: ${name}`);
  fn();
};

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
