import data from "./data/names/autonomies.json";

import { cities } from "./cities";
import { provinces } from "./provinces";
import { optionsAutonomy, Autonomy } from "./types/index";

/**
 * Returns an array of autonomies that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the autonomy to filter by.
 * @param options.name A string representing the name of the autonomy to filter by.
 * @param options.with_provinces A boolean indicating if the result should include provinces associated with each autonomy.
 * @param options.with_cities A boolean indicating if the result should include cities associated with each autonomy.
 */
export const autonomies = (options: optionsAutonomy = {}): Autonomy[] => {
  const { code, name, with_provinces = false, with_cities = false } = options;

  const filtered = data.filter((autonomy: Autonomy) =>
    (code === undefined || autonomy.code == code) &&
    (name === undefined || autonomy.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  );

  return filtered.map((autonomy: Autonomy) => ({
    ...autonomy,
    ...(with_provinces && { provinces: provinces({ code_autonomy: autonomy.code }) }),
    ...(with_cities && { cities: cities({ code_autonomy: autonomy.code }) })
  }));
}