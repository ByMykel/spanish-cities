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
<script type="module">
  import { cities } from "https://cdn.jsdelivr.net/npm/all-spanish-cities@2/+esm";

  console.log(cities({ code_province: "28" }).length);
</script>
```

The ESM build is plain modules, so a page that only needs provinces can point
straight at that dataset and download ~5 KB instead of ~730 KB:

```html
<script type="module">
  import { provinces } from "https://cdn.jsdelivr.net/npm/all-spanish-cities@2/dist/esm/standalone/provinces.js";
</script>
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

### Smaller Imports

The package root loads all three datasets, because `with_provinces`,
`with_cities`, `with_autonomy` and `with_province` can join across any of them.
The city data alone is ~720 KB, which is a lot to ship if you only need a
province dropdown.

Each dataset is also published on its own subpath. These accept the same
filters **minus** the `with_*` relations, and load nothing else:

```js
import { autonomies } from "all-spanish-cities/autonomies";  // ~2 KB
import { provinces } from "all-spanish-cities/provinces";    // ~5 KB
import { cities } from "all-spanish-cities/cities";          // ~720 KB

provinces({ code_autonomy: "01" });  // works
provinces({ with_cities: true });    // not available here - use the root import
```

Bundled with esbuild, importing `provinces` from the subpath produces 6 KB
against 736 KB from the root.

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
  flag: string;              // placeholder URL when has_flag is false
  coat_of_arms: string;      // placeholder URL when has_coat_of_arms is false
  has_flag: boolean;
  has_coat_of_arms: boolean;
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
  flag: string;              // placeholder URL when has_flag is false
  coat_of_arms: string;      // placeholder URL when has_coat_of_arms is false
  has_flag: boolean;
  has_coat_of_arms: boolean;
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
  flag: string;              // placeholder URL when has_flag is false
  coat_of_arms: string;      // placeholder URL when has_coat_of_arms is false
  has_flag: boolean;
  has_coat_of_arms: boolean;
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

## Flags & Coats of Arms

Not every municipality has a known flag or coat of arms. `flag` and
`coat_of_arms` are always a URL so they can be dropped straight into an
`<img>`, falling back to a neutral placeholder image when nothing is known.
Use `has_flag` and `has_coat_of_arms` to tell the two apart:

```js
import { cities } from "all-spanish-cities";

const [city] = cities({ code: "410883" });

city.flag;      // → ".../no_flag.svg" (placeholder)
city.has_flag;  // → false

// Render only real flags
cities().filter((city) => city.has_flag);
```

## Data Sources

| Data | Source |
|------|--------|
| Names & Codes | [INE (Instituto Nacional de Estadística)](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&menu=ultiDatos&idp=1254734710990) |
| Flags & Coats of Arms | Wikipedia |

## License

[MIT](LICENSE) © [ByMykel](https://github.com/ByMykel)
