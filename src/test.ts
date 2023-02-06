import assert from 'assert';
import { Autonomy, autonomies } from './autonomies';

const test = ({ name, fn, }: { name: string; fn: () => void }) => {
  console.log(`Testing: ${name}`);
  fn();
};

test({
  name: 'should return an array',
  fn: () => {
    const result = autonomies();

    assert(Array.isArray(result));
  },
});

test({
  name: 'should return an array with 19 items',
  fn: () => {
    const result = autonomies();

    assert.strictEqual((<string[]>result).length, 19);
  },
});

test({
  name: 'should return an array of Autonomies with code and name',
  fn: () => {
    const result = autonomies({ with_code: true });

    assert(Array.isArray(result));

    assert.strictEqual((<Autonomy[]>result)[0].code, '01');
    assert.strictEqual((<Autonomy[]>result)[0].name, 'Andalucía');
  },
});

test({
  name: 'should return Extremadura when code is 11',
  fn: () => {
    const result = autonomies({ code: '11' });

    assert.strictEqual(result, 'Extremadura');
  },
});

test({
  name: 'should return Autonomy of Cataluña when code is 09 and with_code is true',
  fn: () => {
    const result = autonomies({ code: '11', with_code: true });

    assert.strictEqual((<Autonomy>result).code, '11');
    assert.strictEqual((<Autonomy>result).name, 'Extremadura');
  },
});

test({
  name: 'should return undefined when code is 99',
  fn: () => {
    const result = autonomies({ code: '99' });

    assert.strictEqual(result, undefined);
  }
});

test({
  name: 'should return undefined when code is 99',
  fn: () => {
    const result = autonomies({ code: '99', with_code: true });

    assert.strictEqual(result, undefined);
  }
});

test({
  name: 'should throw an error when code is not a string or a number',
  fn: () => {
    // @ts-ignore
    assert.throws(() => autonomies({ code: {} }));
  }
});