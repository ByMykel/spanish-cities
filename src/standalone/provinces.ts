import rawData from "../data/provinces.json";
import { createNameMatcher, expandImages, matchesCode } from "../internal/expand.js";
import { createIndex, normalizeCode } from "../internal/lookup.js";
import { FiltersProvinceBase, Province } from "../types/index.js";

const data: Province[] = (rawData as unknown as [string, string, string, string | null, string | null][]).map(
  ([code, name, code_autonomy, flag, coat_of_arms]) => ({
    code,
    name,
    code_autonomy,
    ...expandImages(flag, coat_of_arms),
  })
);

const matchesNameAt = createNameMatcher(data.map((province) => province.name));

const byCode = createIndex(data, (province) => province.code);
const byAutonomy = createIndex(data, (province) => province.code_autonomy);

/**
 * Returns the provinces that match the specified filter criteria.
 *
 * This module loads only provinces.json. It deliberately does not support
 * `with_autonomy` / `with_cities` - importing the relations would pull in the
 * other datasets. Import from the package root for the relational API.
 *
 * @param filters (optional) An object with filters.
 * @param filters.code A string or number representing the code of the province to filter by.
 * @param filters.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param filters.name A string representing the name of the province to filter by.
 */
export const provinces = (filters: FiltersProvinceBase = {}): Province[] => {
  const { code, code_autonomy, name } = filters;

  // null means scan everything.
  let candidates: number[] | null = null;

  if (code !== undefined) {
    candidates = byCode(normalizeCode(code, 2));
  } else if (code_autonomy !== undefined) {
    candidates = byAutonomy(normalizeCode(code_autonomy, 2));
  }

  const matches = (position: number): boolean => {
    const province = data[position];

    return (
      matchesCode(province.code, code) &&
      matchesCode(province.code_autonomy, code_autonomy) &&
      matchesNameAt(position, name)
    );
  };

  const result: Province[] = [];

  // Rows are copied so callers cannot mutate the shared dataset.
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
