import { autonomies as selectAutonomies } from "./standalone/autonomies.js";
import { cities as selectCities } from "./standalone/cities.js";
import { provinces as selectProvinces } from "./standalone/provinces.js";
import { FiltersAutonomy, Autonomy } from "./types/index.js";

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

  const filtered = selectAutonomies({ code, name });

  if (!with_provinces && !with_cities) {
    return filtered;
  }

  return filtered.map((autonomy: Autonomy) => ({
    ...autonomy,
    ...(with_provinces && { provinces: selectProvinces({ code_autonomy: autonomy.code }) }),
    ...(with_cities && { cities: selectCities({ code_autonomy: autonomy.code }) })
  }));
}
