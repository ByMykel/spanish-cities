import rawData from "../data/provinces.json";
import { createNameMatcher, expandImages, matchesCode } from "../internal/expand.js";
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

  // Copy each row so callers cannot mutate the shared dataset.
  return data.filter(
    (province, index) =>
      matchesCode(province.code, code) &&
      matchesCode(province.code_autonomy, code_autonomy) &&
      matchesNameAt(index, name)
  ).map((item) => ({ ...item }));
};
