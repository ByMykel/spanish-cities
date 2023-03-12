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
import { provinces } from "all-spanish-cities";

console.log(provinces());
// [
//   { code: "04", name: "Almería", code_autonomous_community: "01" },
//   { code: "11", name: "Cádiz", code_autonomous_community: "01" },
//   { code: "14", name: "Córdoba", code_autonomous_community: "01" },
//   // …and many more
// ]

// You can filter by any of the properties (except `name`).
console.log(provinces({ code: "44" code_autonomous_community: "02" }));
// [{ code: "44", name: "Teruel", code_autonomous_community: "02" }]
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
//   }
// ]
```

## Source

- The names and code are extracted from the [INE][ine] website, read the [terms of use][ine-terms-of-use] before use.

- The Administrative boundaries are extracted from the [Eurostat][Eurostat] website, the usage of these data is subject to the acceptance of the following [clauses][eurostat-clauses]

  > 1. The Commission agrees to grant the non-exclusive and not transferable right to use and process the Eurostat/GISCO geographical data downloaded from this page (the "data").
  > 2. The permission to use the data is granted on condition that:
  >     - the data will not be used for commercial purposes;
  >     - the source will be acknowledged. A copyright notice, as specified below, will have to be visible on any printed or electronic publication using the data downloaded from this page.

## License

[MIT][license]

<!-- Definition -->

[ine]: https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&menu=ultiDatos&idp=1254734710990
[eurostat]: https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/countries
[eurostat-clauses]: https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units
[ine-terms-of-use]: https://www.ine.es/ss/Satellite?L=0&c=Page&cid=1254735849170&p=1254735849170&pagename=Ayuda%2FINELayout

[downloads-badge]: https://img.shields.io/npm/dm/all-spanish-cities.svg
[downloads]: https://www.npmjs.com/package/all-spanish-cities
[license]: LICENSE
