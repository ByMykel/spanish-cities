import { autonomies } from "./autonomies";
import data from "./data/names/cities.json";
import { provinces } from "./provinces";
import { OptionsCity, City } from "./types";

/**
 * Returns an array of cities that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the city to filter by.
 * @param options.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param options.code_province A string or number representing the code of the province to filter by.
 * @param options.name A string representing the name of the city to filter by.
 * @param options.with_autonomy A boolean indicating if the result should include the autonomy associated with each city.
 * @param options.with_province A boolean indicating if the result should include the province associated with each city.
 */
export const cities = (options: OptionsCity = {}): City[] => {
  const { code, code_autonomy, code_province, name, with_autonomy = false, with_province = false } = options;

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
