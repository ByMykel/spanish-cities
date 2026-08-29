import { autonomies } from "./autonomies";
import rawData from "./data/cities.json";
import { provinces } from "./provinces";
import { expandImages, matchesCode, matchesName } from "./internal/expand";
import { FiltersCity, City } from "./types";

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
    matchesCode(city.code, code) &&
    matchesCode(city.code_autonomy, code_autonomy) &&
    matchesCode(city.code_province, code_province) &&
    matchesName(city.name, name)
  );

  return filtered.map((city: City) => ({
    ...city,
    ...(with_autonomy && { autonomy: autonomies({ code: city.code_autonomy })[0] }),
    ...(with_province && { province: provinces({ code: city.code_province })[0] })
  }));
}
