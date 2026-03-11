import { autonomies } from "./autonomies";
import rawData from "./data/cities.json";
import { provinces } from "./provinces";
import { FiltersCity, City } from "./types";

const WIKIMEDIA_PREFIX = "https://upload.wikimedia.org/wikipedia/commons/";
const PLACEHOLDER_FLAG = "https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_flag.svg";
const PLACEHOLDER_COAT = "https://raw.githubusercontent.com/ByMykel/spanish-cities/refs/heads/main/no_coat.svg";

const data: City[] = (rawData as unknown as [string, string, string, string | null, string | null][]).map(
  ([code, name, code_autonomy, flag, coat_of_arms]) => ({
    code,
    name,
    code_autonomy,
    code_province: code.substring(0, 2),
    flag: flag ? WIKIMEDIA_PREFIX + flag : PLACEHOLDER_FLAG,
    coat_of_arms: coat_of_arms ? WIKIMEDIA_PREFIX + coat_of_arms : PLACEHOLDER_COAT,
  })
);

/**
 * Returns an array of cities that match the specified filter criteria.
 * @param filters (optional) An object with filters.
 * @param filters.code A string or number representing the code of the city to filter by.
 * @param filters.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param filters.code_province A string or number representing the code of the province to filter by.
 * @param filters.name A string representing the name of the city to filter by.
 * @param filters.with_autonomy A boolean indicating if the result should include the autonomy associated with each city.
 * @param filters.with_province A boolean indicating if the result should include the province associated with each city.
 */
export const cities = (filters: FiltersCity = {}): City[] => {
  const { code, code_autonomy, code_province, name, with_autonomy = false, with_province = false } = filters;

  const filtered = data.filter((city: City) =>
    (code === undefined || city.code == code) &&
    (code_autonomy === undefined || city.code_autonomy == code_autonomy) &&
    (code_province === undefined || city.code_province == code_province) &&
    (name === undefined || city.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  );

  return filtered.map((city: City) => ({
    ...city,
    ...(with_autonomy && { autonomy: autonomies({ code: city.code_autonomy })[0] }),
    ...(with_province && { province: provinces({ code: city.code_province })[0] })
  }));
}
