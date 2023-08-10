import assert from 'assert';
import { autonomies } from './autonomies';
import { cities } from './cities';
import { provinces } from './provinces';
import { Autonomy, City, Province } from './types';

const test = ({ name, fn }: { name: string; fn: () => void }) => {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}`);
    console.error(error);
  }
};

console.group('Testing autonomies.ts:');

test({
  name: 'should return all 19 autonomies',
  fn: () => {
    const result = autonomies();

    assert.strictEqual((<Autonomy[]>result).length, 19);
  },
});

test({
  name: 'should return all autonomies with their provinces',
  fn: () => {
    const result = autonomies({ with_provinces: true });

    assert(result.every((item: Autonomy) => Array.isArray(item.provinces)))
  }
});

test({
  name: 'should return all autonomies with their cities',
  fn: () => {
    const result = autonomies({ with_cities: true });

    assert(result.every((item: Autonomy) => Array.isArray(item.cities)))
  }
});

test({
  name: 'should return all autonomies without their provinces and cities',
  fn: () => {
    const result = autonomies({ with_provinces: false, with_cities: false });

    assert(result.every((item: Autonomy) => item?.provinces === undefined && item?.cities === undefined))
  }
});

test({
  name: 'should return an array with the autonomy of Extremadura when code is "11"',
  fn: () => {
    const result = autonomies({ code: 11 });

    assert(Array.isArray(result));

    assert.deepStrictEqual((<Autonomy[]>result)[0], {
      "code": "11",
      "name": "Extremadura",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/13/Flag_of_Extremadura%2C_Spain_%28with_coat_of_arms%29.svg",
      "coat_of_arms": null,
      "hymn": null,
      "coordinates": {
        "latitude": null,
        "longitude": null
      },
      "links": {
        "wikipedia": null,
        "geohack": null,
        "website": null
      }
    });
  },
});

test({
  name: 'should return empty array when code is "DOES_NOT_EXIST"',
  fn: () => {
    const result = autonomies({ code: 'DOES_NOT_EXIST' });

    assert.strictEqual((<Autonomy[]>result).length, 0);
  }
});

test({
  name: 'should return 2 autonomies ("Castilla y León" and "Castilla-La Mancha") when name is "tilla"',
  fn: () => {
    const result = autonomies({ name: 'tilla' });

    assert.deepStrictEqual((<Autonomy[]>result)[0], {
      "code": "07",
      "name": "Castilla y León",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/13/Flag_of_Castile_and_Le%C3%B3n.svg",
      "coat_of_arms": null,
      "hymn": null,
      "coordinates": {
        "latitude": null,
        "longitude": null
      },
      "links": {
        "wikipedia": null,
        "geohack": null,
        "website": null
      }
    });

    assert.deepStrictEqual((<Autonomy[]>result)[1], {
      "code": "08",
      "name": "Castilla-La Mancha",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Bandera_Castilla-La_Mancha.svg",
      "coat_of_arms": null,
      "hymn": null,
      "coordinates": {
        "latitude": null,
        "longitude": null
      },
      "links": {
        "wikipedia": null,
        "geohack": null,
        "website": null
      }
    });

    assert.strictEqual((<Autonomy[]>result).length, 2);
  }
});

test({
  name: 'should return the autonomy of Madrid with the province of Madrid',
  fn: () => {
    const result = autonomies({ code: 13, with_provinces: true });

    assert.deepStrictEqual((<Autonomy[]>result)[0], {
      coat_of_arms: null,
      code: '13',
      coordinates: {
        latitude: null,
        longitude: null
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_the_Community_of_Madrid.svg',
      hymn: null,
      links: {
        geohack: null,
        website: null,
        wikipedia: null
      },
      name: 'Madrid, Comunidad de',
      provinces: [
        {
          code: '28',
          code_autonomy: '13',
          name: 'Madrid'
        }
      ]
    });
  }
});

test({
  name: 'should return the autonomy of La Rioja with their 174 cities',
  fn: () => {
    const result = autonomies({ code: 17, with_cities: true });

    assert.strictEqual((<Autonomy[]>result)[0]?.cities?.length, 174);
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
  name: 'should return 6 provinces when name is "Ri"',
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
  name: 'should return an array with 8131 items',
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