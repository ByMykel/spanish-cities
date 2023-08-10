import data from "./data/names/autonomies.json";

import { cities } from "./cities";
import { provinces } from "./provinces";
import { optionsAutonomy, Autonomy } from "./types/index";

/**
 * Returns an array of autonomies that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the autonomy to filter by.
 * @param options.name A string representing the name of the autonomy to filter by.
 */
export const autonomies = (options: optionsAutonomy = {}): Autonomy[] => {
  const { code, name, with_provinces = false, with_cities = false } = options;

  const filtered = data.filter((item: Autonomy) =>
    (code === undefined || item.code == code) &&
    (name === undefined || item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  );

  return filtered.map((item: Autonomy) => ({
    ...item,
    ...(with_provinces && { provinces: provinces({ code_autonomy: item.code }) }),
    ...(with_cities && { cities: cities({ code_autonomy: item.code }) })
  }));
}