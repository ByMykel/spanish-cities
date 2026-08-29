import rawData from "./data/autonomies.json";

import { cities } from "./cities";
import { provinces } from "./provinces";
import { expandImages, matchesCode, matchesName } from "./internal/expand";
import { FiltersAutonomy, Autonomy } from "./types/index";

const data: Autonomy[] = (rawData as unknown as [string, string, string | null, string | null][]).map(
  ([code, name, flag, coat_of_arms]) => ({
    code,
    name,
    ...expandImages(flag, coat_of_arms),
  })
);

/**
 * Returns an array of autonomies that match the specified filter criteria.
 * @param filters (optional) An object with filters.
 * @param filters.code A string or number representing the code of the autonomy to filter by.
 * @param filters.name A string representing the name of the autonomy to filter by.
 * @param filters.with_provinces A boolean indicating if the result should include provinces associated with each autonomy.
 * @param filters.with_cities A boolean indicating if the result should include cities associated with each autonomy.
 */
export const autonomies = (filters: FiltersAutonomy = {}): Autonomy[] => {
  const { code, name, with_provinces = false, with_cities = false } = filters;

  const filtered = data.filter((autonomy: Autonomy) =>
    matchesCode(autonomy.code, code) &&
    matchesName(autonomy.name, name)
  );

  return filtered.map((autonomy: Autonomy) => ({
    ...autonomy,
    ...(with_provinces && { provinces: provinces({ code_autonomy: autonomy.code }) }),
    ...(with_cities && { cities: cities({ code_autonomy: autonomy.code }) })
  }));
}
