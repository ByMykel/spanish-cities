import { autonomies } from "./autonomies";
import data from "./data/cities.json";
import { provinces } from "./provinces";
import { FiltersCity, City } from "./types";

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
