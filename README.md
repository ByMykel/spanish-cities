# `all-spanish-cities`

[![Downloads][downloads-badge]][downloads]

List of spanish cities and autonomies.

## Install

```sh
npm install all-spanish-cities
```

## Use

```js
import { autonomies } from "all-spanish-cities";

console.log(autonomies());
// [
//   { code: "01", name: "Andalucía" },
//   { code: "02", name: "Aragón" },
//   { code: "03", name: "Asturias, Principado de" },
//   // …and many more
// ]

// You can filter by code.
console.log(autonomies({ code: "02" }));
// [{ code: "02", name: "Aragón" }]

console.log(autonomies({ code: "DOES_NOT_EXIST" }));
// []
```

```js
import { cities } from "all-spanish-cities";

console.log(cities());
// [
//   // …
//   {
//     name: "Madrid",
//     code_autonomous_community: "13",
//     code_province: "28",
//     code_municipality: "079",
//     extra_digit: "6",
//   },
//   // …and many more
// ]

// You can filter by any of the properties (except `name`).
console.log(cities({ code_autonomous_community: "16", code_municipality: "001" }));
// [
//   {
//     name: "Alegría-Dulantzi",
//     code_autonomous_community: "16",
//     code_province: "01",
//     code_municipality: "001",
//     extra_digit: "4",
//   },
// ]
```

## License

[MIT][license]

<!-- Definition -->

[downloads-badge]: https://img.shields.io/npm/dm/all-spanish-cities.svg
[downloads]: https://www.npmjs.com/package/all-spanish-cities
[license]: license
