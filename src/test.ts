import assert from "assert";

import { autonomies } from "./autonomies";
import { provinces } from "./provinces";
import { cities } from "./cities";
import { Autonomy, City, Province } from "./types";

const test = ({ name, fn }: { name: string; fn: () => void }) => {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}`);
    console.error(error);
  }
};

const groupByCode = (items: Autonomy[] | Province[] | City[]) => {
  const seenCodes = {} as {
    [id: string]: number;
  };

  items.forEach((item) => {
    if (!(item.code in seenCodes)) {
      seenCodes[item.code] = 0;
    }
    seenCodes[item.code] += 1;
  });

  Object.entries(seenCodes).forEach(([id, count]) => {
    if (count > 1) {
      assert(false, `code "${id}" is repeted ${count} times`);
    }
  });
};

console.group("Testing autonomies.ts:");

test({
  name: "should return all 19 autonomies",
  fn: () => {
    const result = autonomies();

    assert.strictEqual((<Autonomy[]>result).length, 19);
  },
});

test({
  name: "should return all autonomies with their provinces and cities",
  fn: () => {
    const result = autonomies({ with_provinces: true, with_cities: true });

    assert(
      result.every(
        (item: Autonomy) =>
          Array.isArray(item.provinces) && Array.isArray(item.cities)
      )
    );
  },
});

test({
  name: "should return all autonomies without their provinces and cities",
  fn: () => {
    const result = autonomies({ with_provinces: false, with_cities: false });

    assert(
      result.every(
        (item: Autonomy) =>
          item?.provinces === undefined && item?.cities === undefined
      )
    );
  },
});

test({
  name: 'should return 1 autonomy ("Extremadura") when code is "11"',
  fn: () => {
    const result = autonomies({ code: 11 });

    assert.strictEqual((<Autonomy[]>result).length, 1);
    assert.deepStrictEqual((<Autonomy[]>result)[0], {
      code: "11",
      name: "Extremadura",
      flag: "https://upload.wikimedia.org/wikipedia/commons/1/13/Flag_of_Extremadura%2C_Spain_%28with_coat_of_arms%29.svg",
      coat_of_arms:
        "https://upload.wikimedia.org/wikipedia/commons/e/e6/Escudo_de_Extremadura.svg",
      hymn: null,
      coordinates: {
        latitude: 39.2,
        longitude: -6.15,
      },
      links: {
        wikipedia: "https://es.wikipedia.org/wiki/Extremadura",
        geohack:
          "https://geohack.toolforge.org/geohack.php?language=es&pagename=Extremadura&params=39.2_N_-6.15_E_type:city",
      },
    });
  },
});

test({
  name: 'should return 2 autonomies ("Castilla y León" and "Castilla-La Mancha") when name is "tilla"',
  fn: () => {
    const result = autonomies({ name: "tilla" });

    assert.deepStrictEqual((<Autonomy[]>result)[0], {
      code: "07",
      name: "Castilla y León",
      flag: "https://upload.wikimedia.org/wikipedia/commons/1/13/Flag_of_Castile_and_Le%C3%B3n.svg",
      coat_of_arms:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Escudo_de_Castilla_y_Le%C3%B3n_-_Versi%C3%B3n_her%C3%A1ldica_oficial.svg",
      hymn: null,
      coordinates: {
        latitude: 41.754444,
        longitude: -4.781944,
      },
      links: {
        wikipedia: "https://es.wikipedia.org/wiki/Castilla_y_Le%C3%B3n",
        geohack:
          "https://geohack.toolforge.org/geohack.php?language=es&pagename=Castilla_y_Le%C3%B3n&params=41.754444444444_N_-4.7819444444444_E_type:city",
      },
    });

    assert.deepStrictEqual((<Autonomy[]>result)[1], {
      code: "08",
      name: "Castilla-La Mancha",
      flag: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Bandera_Castilla-La_Mancha.svg",
      coat_of_arms:
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Escudo_de_Castilla-La_Mancha.svg",
      hymn: null,
      coordinates: {
        latitude: 39.500011,
        longitude: -3.000033,
      },
      links: {
        wikipedia: "https://es.wikipedia.org/wiki/Castilla-La_Mancha",
        geohack:
          "https://geohack.toolforge.org/geohack.php?language=es&pagename=Castilla-La_Mancha&params=39.500011111111_N_-3.0000333333333_E_type:city",
      },
    });

    assert.strictEqual((<Autonomy[]>result).length, 2);
  },
});

test({
  name: 'should return empty array when code is "DOES_NOT_EXIST"',
  fn: () => {
    const result = autonomies({ code: "DOES_NOT_EXIST" });

    assert.strictEqual((<Autonomy[]>result).length, 0);
  },
});

console.groupEnd();
console.group("\nTesting provinces.ts:");

test({
  name: "should return all 52 provinces",
  fn: () => {
    const result = provinces();

    assert.strictEqual((<Province[]>result).length, 52);
  },
});

test({
  name: "should return all provinces with their autonomy and cities",
  fn: () => {
    const result = provinces({ with_autonomy: true, with_cities: true });

    assert(
      result.every(
        (item: Province) =>
          item?.autonomy !== undefined && item?.cities !== undefined
      )
    );
  },
});

test({
  name: "should return all provinces without their autonomy and cities",
  fn: () => {
    const result = provinces({ with_autonomy: false, with_cities: false });

    assert(
      result.every(
        (item: Province) =>
          item?.autonomy === undefined && item?.cities === undefined
      )
    );
  },
});

test({
  name: 'should return 1 provinces ("Burgos") when code is 09',
  fn: () => {
    const result = provinces({ code: "09" });

    assert.strictEqual((<Province[]>result).length, 1);
    assert.deepStrictEqual((<Province[]>result)[0], {
      code: "09",
      name: "Burgos",
      code_autonomy: "07",
    });
  },
});

test({
  name: 'should return 2 provinces when code_autonomy is "11"',
  fn: () => {
    const result = provinces({ code_autonomy: "11" });

    assert.strictEqual((<Province[]>result).length, 2);
    assert.deepStrictEqual((<Province[]>result)[0], {
      code: "06",
      name: "Badajoz",
      code_autonomy: "11",
    });
    assert.deepStrictEqual((<Province[]>result)[1], {
      code: "10",
      name: "Cáceres",
      code_autonomy: "11",
    });
  },
});

test({
  name: 'should return 6 provinces when name is "Ri"',
  fn: () => {
    const result = provinces({ name: "Ri" });

    assert.strictEqual((<Province[]>result).length, 6);
  },
});

test({
  name: 'should return empty array when code is "DOES_NOT_EXIST"',
  fn: () => {
    const result = provinces({ code: "DOES_NOT_EXIST" });

    assert.strictEqual((<Province[]>result).length, 0);
  },
});

test({
  name: 'should return empty array when code_autonomy is "DOES_NOT_EXIST"',
  fn: () => {
    const result = provinces({ code_autonomy: "DOES_NOT_EXIST" });

    assert.strictEqual((<Province[]>result).length, 0);
  },
});

console.groupEnd();
console.group("\nTesting cities.ts:");

test({
  name: "should return all 8131 cities",
  fn: () => {
    const result = cities();

    assert.strictEqual((<City[]>result).length, 8131);
  },
});

test({
  name: "should return all cities with their autonomy and province",
  fn: () => {
    const result = cities({ with_autonomy: true, with_province: true });

    assert(
      result.every(
        (item: City) =>
          item?.autonomy !== undefined && item?.province !== undefined
      )
    );
  },
});

test({
  name: "should return all cities without their autonomy and province",
  fn: () => {
    const result = cities({ with_autonomy: false, with_province: false });

    assert(
      result.every(
        (item: City) =>
          item?.autonomy === undefined && item?.province === undefined
      )
    );
  },
});

test({
  name: 'should return 1 city ("San Nicolás del Puerto") when code is "410883"',
  fn: () => {
    const result = cities({ code: "410883" });

    assert.strictEqual((<City[]>result).length, 1);
    assert.deepStrictEqual((<City[]>result)[0], {
      code: "410883",
      name: "San Nicolás del Puerto",
      code_autonomy: "01",
      code_province: "41",
    });
  },
});

test({
  name: 'should return 179 cities of Madrid when code_autonomy is "13"',
  fn: () => {
    const result = cities({ code_autonomy: "13" });

    assert(result.every((item: City) => item.code_autonomy === "13"));
    assert.strictEqual((<City[]>result).length, 179);
  },
});

test({
  name: 'should return 141 cities when code_province is "03"',
  fn: () => {
    const result = cities({ code_province: "03" });

    assert(result.every((item: City) => item.code_province === "03"));
    assert.strictEqual((<City[]>result).length, 141);
  },
});

test({
  name: 'should return 25 cities when name is "Valverde"',
  fn: () => {
    const result = cities({ name: "Valverde" });

    assert.strictEqual((<City[]>result).length, 25);
  },
});

test({
  name: 'should return empty array when code is "DOES_NOT_EXIST"',
  fn: () => {
    const result = cities({ code: "DOES_NOT_EXIST" });

    assert.strictEqual((<City[]>result).length, 0);
  },
});

test({
  name: 'should return empty array when code_autonomy is "DOES_NOT_EXIST"',
  fn: () => {
    const result = cities({ code_autonomy: "DOES_NOT_EXIST" });

    assert.strictEqual((<City[]>result).length, 0);
  },
});

test({
  name: 'should return empty array when code_province is "DOES_NOT_EXIST"',
  fn: () => {
    const result = cities({ code_province: "DOES_NOT_EXIST" });

    assert.strictEqual((<City[]>result).length, 0);
  },
});

console.groupEnd();
console.group("\nTesting general things:");

test({
  name: "autonomies must have unique code",
  fn: () => {
    groupByCode(autonomies());
  },
});

test({
  name: "provinces must have unique code",
  fn: () => {
    groupByCode(autonomies());
  },
});

test({
  name: "cities must have unique code",
  fn: () => {
    groupByCode(cities());
  },
});
