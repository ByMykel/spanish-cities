# `all-spanish-cities`

[![Downloads][downloads-badge]][downloads]

List of spanish autonomies, provinces and cities.

## Install

```sh
npm install all-spanish-cities
```

## Use

```js
import { autonomies } from "all-spanish-cities";

// options object is optional.
const options = {
  // code: "01",
};

console.log(autonomies(options));
// [
//   {
//     "code": "01",
//     "name": "Andalucía"
//   },
//   // …and many more
// ]
```

```js
import { provinces } from "all-spanish-cities";

// options object is optional.
const options = {
  // code: "18",
  // code_autonomy: "01",
};

console.log(provinces(options));
// [
//   {
//     "code": "04",
//     "name": "Almería",
//     "code_autonomy": "01"
//   },
//   // …and many more
// ]
```

```js
import { cities } from "all-spanish-cities";

// options object is optional.
const options = {
  // code: "280783",
  // code_autonomy: "13",
  // code_province: "28"
};

console.log(cities(options));
// [
//   {
//     "code": "010014",
//     "name": "Alegría-Dulantzi",
//     "code_autonomy": "16",
//     "code_province": "01"
//   },
//   // …and many more
// ]
```

## Source

- The names and code are extracted from the [INE][ine] website.

## License

[MIT][license]

<!-- Definition -->

[ine]: https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&menu=ultiDatos&idp=1254734710990

[downloads]: https://www.npmjs.com/package/all-spanish-cities
[downloads-badge]: https://img.shields.io/npm/dm/all-spanish-cities.svg
[license]: LICENSE
