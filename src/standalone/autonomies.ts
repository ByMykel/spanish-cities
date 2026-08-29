import rawData from "../data/autonomies.json";
import { createNameMatcher, expandImages, matchesCode } from "../internal/expand.js";
import { createIndex, normalizeCode } from "../internal/lookup.js";
import { Autonomy, FiltersAutonomyBase } from "../types/index.js";

const data: Autonomy[] = (rawData as unknown as [string, string, string | null, string | null][]).map(
  ([code, name, flag, coat_of_arms]) => ({
    code,
    name,
    ...expandImages(flag, coat_of_arms),
  })
);

const matchesNameAt = createNameMatcher(data.map((autonomy) => autonomy.name));

const byCode = createIndex(data, (autonomy) => autonomy.code);

/**
 * Returns the autonomies that match the specified filter criteria.
 *
 * This module loads only autonomies.json. It deliberately does not support
 * `with_provinces` / `with_cities` - importing the relations would pull in the
 * other datasets. Import from the package root for the relational API.
 *
 * @param filters (optional) An object with filters.
 * @param filters.code A string or number representing the code of the autonomy to filter by.
 * @param filters.name A string representing the name of the autonomy to filter by.
 */
export const autonomies = (filters: FiltersAutonomyBase = {}): Autonomy[] => {
  const { code, name } = filters;

  // Narrow through the code index; null means scan all.
  const candidates: number[] | null =
    code === undefined ? null : byCode(normalizeCode(code, 2));

  const matches = (position: number): boolean =>
    matchesCode(data[position].code, code) && matchesNameAt(position, name);

  const result: Autonomy[] = [];

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
