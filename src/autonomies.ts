import rawData from "./data/autonomies.json";

import { cities } from "./cities";
import { provinces } from "./provinces";
import { FiltersAutonomy, Autonomy } from "./types/index";

const WIKIMEDIA_PREFIX = "https://upload.wikimedia.org/wikipedia/commons/";
const PLACEHOLDER_FLAG = "https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_flag.svg";
const PLACEHOLDER_COAT = "https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_coat.svg";

const data: Autonomy[] = (rawData as unknown as [string, string, string | null, string | null][]).map(
  ([code, name, flag, coat_of_arms]) => ({
    code,
    name,
    flag: flag ? WIKIMEDIA_PREFIX + flag : PLACEHOLDER_FLAG,
    coat_of_arms: coat_of_arms ? WIKIMEDIA_PREFIX + coat_of_arms : PLACEHOLDER_COAT,
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
    (code === undefined || autonomy.code == code) &&
    (name === undefined || autonomy.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  );

  return filtered.map((autonomy: Autonomy) => ({
    ...autonomy,
    ...(with_provinces && { provinces: provinces({ code_autonomy: autonomy.code }) }),
    ...(with_cities && { cities: cities({ code_autonomy: autonomy.code }) })
  }));
}