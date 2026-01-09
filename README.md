<p align="center">
  <img src="docs/icon.svg" alt="all-spanish-cities" width="80" height="80">
</p>

<h1 align="center">all-spanish-cities</h1>

<p align="center">
  A comprehensive library providing data on Spain's autonomies, provinces, and cities — including codes, names, flags, and coats of arms.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/all-spanish-cities"><img src="https://img.shields.io/npm/v/all-spanish-cities.svg?style=flat-square&color=c60b1e" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/all-spanish-cities"><img src="https://img.shields.io/npm/dm/all-spanish-cities.svg?style=flat-square" alt="downloads"></a>
  <a href="https://www.jsdelivr.com/package/npm/all-spanish-cities"><img src="https://data.jsdelivr.com/v1/package/npm/all-spanish-cities/badge?style=square" alt="jsdelivr"></a>
  <a href="https://github.com/ByMykel/spanish-cities/actions"><img src="https://img.shields.io/github/actions/workflow/status/ByMykel/spanish-cities/tests.yml?style=flat-square" alt="tests"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/all-spanish-cities.svg?style=flat-square" alt="license"></a>
</p>

<p align="center">
  <a href="https://bymykel.github.io/spanish-cities/">Live Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#license">License</a>
</p>

---

## Features

- **19 Autonomies** — All Spanish autonomous communities
- **52 Provinces** — Complete province data with autonomy relationships
- **8,131 Cities** — Every Spanish municipality
- **Flags & Coats of Arms** — Visual assets from Wikipedia
- **Official INE Codes** — Instituto Nacional de Estadística codes
- **TypeScript Support** — Full type definitions included
- **Zero Dependencies** — Lightweight and fast

## Installation

```bash
npm install all-spanish-cities
```

### CDN Usage

```html
<script src="https://cdn.jsdelivr.net/npm/all-spanish-cities/dist/index.js"></script>
```

## Usage

```js
import { autonomies, provinces, cities } from "all-spanish-cities";

// Get all autonomies
const allAutonomies = autonomies();

// Get all cities in Madrid province
const madridCities = cities({ code_province: "28" });

// Search cities by name
const results = cities({ name: "Barcelona" });

// Get province with its autonomy data
const [almeria] = provinces({ name: "Almería", with_autonomy: true });
```

## API

### `autonomies(filters?)`

Returns an array of Spanish autonomous communities.

#### Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | `string \| number` | Filter by autonomy code |
| `name` | `string` | Filter by name (case-insensitive, partial match) |
| `with_provinces` | `boolean` | Include provinces array |
| `with_cities` | `boolean` | Include cities array |

#### Response

```ts
interface Autonomy {
  code: string;
  name: string;
  flag: string;
  coat_of_arms: string;
  provinces?: Province[];  // when with_provinces: true
  cities?: City[];         // when with_cities: true
}
```

#### Example

```js
import { autonomies } from "all-spanish-cities";

// Get all autonomies
autonomies();
// → [{ code: "01", name: "Andalucía", flag: "...", coat_of_arms: "..." }, ...]

// Get Catalonia with its provinces
autonomies({ name: "Cataluña", with_provinces: true });
// → [{ code: "09", name: "Cataluña", ..., provinces: [...] }]
```

---

### `provinces(filters?)`

Returns an array of Spanish provinces.

#### Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | `string \| number` | Filter by province code |
| `code_autonomy` | `string \| number` | Filter by autonomy code |
| `name` | `string` | Filter by name (case-insensitive, partial match) |
| `with_autonomy` | `boolean` | Include parent autonomy object |
| `with_cities` | `boolean` | Include cities array |

#### Response

```ts
interface Province {
  code: string;
  name: string;
  code_autonomy: string;
  flag: string;
  coat_of_arms: string;
  autonomy?: Autonomy;     // when with_autonomy: true
  cities?: City[];         // when with_cities: true
}
```

#### Example

```js
import { provinces } from "all-spanish-cities";

// Get all Andalusian provinces
provinces({ code_autonomy: "01" });
// → [{ code: "04", name: "Almería", ... }, { code: "11", name: "Cádiz", ... }, ...]

// Get Barcelona with its cities
provinces({ name: "Barcelona", with_cities: true });
// → [{ code: "08", name: "Barcelona", ..., cities: [...] }]
```

---

### `cities(filters?)`

Returns an array of Spanish cities/municipalities.

#### Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | `string \| number` | Filter by city code |
| `code_autonomy` | `string \| number` | Filter by autonomy code |
| `code_province` | `string \| number` | Filter by province code |
| `name` | `string` | Filter by name (case-insensitive, partial match) |
| `with_autonomy` | `boolean` | Include parent autonomy object |
| `with_province` | `boolean` | Include parent province object |

#### Response

```ts
interface City {
  code: string;
  name: string;
  code_autonomy: string;
  code_province: string;
  flag: string | null;
  coat_of_arms: string | null;
  autonomy?: Autonomy;     // when with_autonomy: true
  province?: Province;     // when with_province: true
}
```

#### Example

```js
import { cities } from "all-spanish-cities";

// Get all cities named "Valverde"
cities({ name: "Valverde" });
// → [{ code: "...", name: "Valverde de Burguillos", ... }, ...] (25 results)

// Get a specific city with full context
cities({ code: "280796", with_autonomy: true, with_province: true });
// → [{ name: "Madrid", autonomy: { name: "Comunidad de Madrid", ... }, province: { ... } }]
```

## Data Sources

| Data | Source |
|------|--------|
| Names & Codes | [INE (Instituto Nacional de Estadística)](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&menu=ultiDatos&idp=1254734710990) |
| Flags & Coats of Arms | Wikipedia |

## License

[MIT](LICENSE) © [ByMykel](https://github.com/ByMykel)
