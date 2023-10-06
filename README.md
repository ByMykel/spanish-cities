# `all-spanish-cities`

[![Downloads][downloads-badge]][downloads]
[![jsdelivr][jsdelivr-badge]][jsdelivr]


A library that provides data on Spain's autonomies, provinces, and cities, including their codes, names, flags, and coats of arms for seamless integration into your applications.

## Install

```sh
npm install all-spanish-cities
```

## Usage

### Autonomies

```js
import { autonomies } from "all-spanish-cities";

console.log(autonomies());
// [
//   {
//     "code": "01",
//     "name": "Andalucía",
//     "flag": "...",
//     "coat_of_arms": "...",
//   },
//   // …and many more
// ]

// You can filter by any of the following attributes.
console.log(autonomies({
  code: '...', 
  name: '...', 
}));
// [
//   { ... },
//   { ... },
//   // autonomies that match your filters
// ]

// You can also include the provinces and cities of that autonomy.
console.log(autonomies({
  with_provinces = true, 
  with_cities = true
}));
// [
//   {
//     "code": "01",
//     "name": "Andalucía",
//     "flag": "...",
//     "coat_of_arms": "...",
//     "provinces": [{ ... }, { ... }]
//     "cities": [{ ... }, { ... }]
//   },
//   // …and many more
// ]
```

### Provinces

```js
import { provinces } from "all-spanish-cities";

console.log(provinces());
// [
//   {
//     "code": "04",
//     "name": "Almería",
//     "code_autonomy": "01"
//   },
//   // …and many more
// ]

// You can filter by any of the following attributes.
console.log(provinces({
  code: '...', 
  code_autonomy: '...',
  name: '...', 
}));
// [
//   { ... },
//   { ... },
//   // provinces that match your filters
// ]

// You can also include the autonomy and cities of that province.
console.log(provinces({
  with_autonomy = true, 
  with_cities = true
}));
// [
//   {
//     "code": "04",
//     "name": "Almería",
//     "code_autonomy": "01",
//     "flag": "...",
//     "coat_of_arms": "...",
//     "autonomy": { ... }
//     "cities": [{ ... }, { ... }]
//   },
//   // …and many more
// ]
```

### Cities

```js
import { cities } from "all-spanish-cities";

console.log(cities());
// [
//   {
//     "code": "010014",
//     "name": "Alegría-Dulantzi",
//     "code_autonomy": "16",
//     "code_province": "01",
//     "flag": null,
//     "coat_of_arms": null
//   },
//   // …and many more
// ]

// You can filter by any of the following attributes.
console.log(cities({
  code: '...', 
  code_autonomy: '...',
  code_province: '...',
  name: '...', 
}));
// [
//   { ... },
//   { ... },
//   // cities that match your filters
// ]

// You can also include the autonomy and cities of that province.
console.log(cities({
  with_autonomy = true, 
  with_province = true
}));
// [
//   {
//     "code": "010014",
//     "name": "Alegría-Dulantzi",
//     "code_autonomy": "16",
//     "code_province": "01",
//     "flag": null,
//     "coat_of_arms": null
//     "autonomy": { ... }
//     "province": { ... }
//   },
//   // …and many more
// ]
```

## Source

- The names and code are extracted from the [INE][ine] website.
- The flags and coat of arms are extracted from Wikipedia articles.

## License

[MIT][license]

<!-- Definition -->

[ine]: https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&menu=ultiDatos&idp=1254734710990

[downloads]: https://www.npmjs.com/package/all-spanish-cities
[downloads-badge]: https://img.shields.io/npm/dm/all-spanish-cities.svg
[jsdelivr]: https://www.jsdelivr.com/package/npm/all-spanish-cities
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/all-spanish-cities/badge

[license]: LICENSE
