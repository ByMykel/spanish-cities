import rawData from "../data/cities.json";
import { expandImages, matchesCode, matchesName } from "../internal/expand";
import { City, FiltersCityBase } from "../types";

const data: City[] = (rawData as unknown as [string, string, string, string | null, string | null][]).map(
  ([code, name, code_autonomy, flag, coat_of_arms]) => ({
    code,
    name,
    code_autonomy,
    code_province: code.substring(0, 2),
    ...expandImages(flag, coat_of_arms),
  })
);

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

  // Copy each row so callers cannot mutate the shared dataset.
  return data.filter(
    (city) =>
      matchesCode(city.code, code) &&
      matchesCode(city.code_autonomy, code_autonomy) &&
      matchesCode(city.code_province, code_province) &&
      matchesName(city.name, name)
  ).map((item) => ({ ...item }));
};
