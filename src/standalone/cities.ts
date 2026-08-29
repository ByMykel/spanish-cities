import rawData from "../data/cities.json";
import { createNameMatcher, expandImages, matchesCode } from "../internal/expand.js";
import { createIndex, normalizeCode } from "../internal/lookup.js";
import { City, FiltersCityBase } from "../types/index.js";

const data: City[] = (rawData as unknown as [string, string, string, string | null, string | null][]).map(
  ([code, name, code_autonomy, flag, coat_of_arms]) => ({
    code,
    name,
    code_autonomy,
    code_province: code.substring(0, 2),
    ...expandImages(flag, coat_of_arms),
  })
);

const matchesNameAt = createNameMatcher(data.map((city) => city.name));

const byCode = createIndex(data, (city) => city.code);
const byProvince = createIndex(data, (city) => city.code_province);
const byAutonomy = createIndex(data, (city) => city.code_autonomy);

/**
 * Returns the cities that match the specified filter criteria.
 *
 * This module loads only cities.json. It deliberately does not support
 * `with_autonomy` / `with_province` - importing the relations would pull in the
 * other datasets. Import from the package root for the relational API.
 *
 * @param filters (optional) An object with filters.
 * @param filters.code A string or number representing the code of the city to filter by.
 * @param filters.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param filters.code_province A string or number representing the code of the province to filter by.
 * @param filters.name A string representing the name of the city to filter by.
 */
export const cities = (filters: FiltersCityBase = {}): City[] => {
  const { code, code_autonomy, code_province, name } = filters;

  // Narrow through the most selective index available; null means scan all.
  let candidates: number[] | null = null;

  if (code !== undefined) {
    candidates = byCode(normalizeCode(code, 6));
  } else if (code_province !== undefined) {
    candidates = byProvince(normalizeCode(code_province, 2));
  } else if (code_autonomy !== undefined) {
    candidates = byAutonomy(normalizeCode(code_autonomy, 2));
  }

  const matches = (position: number): boolean => {
    const city = data[position];

    return (
      matchesCode(city.code, code) &&
      matchesCode(city.code_autonomy, code_autonomy) &&
      matchesCode(city.code_province, code_province) &&
      matchesNameAt(position, name)
    );
  };

  const result: City[] = [];

  // Copy each row so callers cannot mutate the shared dataset.
  if (candidates === null) {
    for (let position = 0; position < data.length; position += 1) {
      if (matches(position)) result.push({ ...data[position] });
    }
  } else {
    for (const position of candidates) {
      if (matches(position)) result.push({ ...data[position] });
    }
  }

  return result;
};
