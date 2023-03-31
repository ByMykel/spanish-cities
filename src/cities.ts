import data from "./data/names/cities.json";
import { OptionsCity, City } from "./types";

/**
 * Returns an array of cities that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the city to filter by.
 * @param options.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param options.code_province A string or number representing the code of the province to filter by.
 * @param options.name A string representing the name of the city to filter by.
 */
export const cities = (options: OptionsCity = {}): City[] => {
  const { code, code_autonomy, code_province, name } = options;

  return data.filter((item: City) => {
    if (code !== undefined && item.code != code) return false;
    if (code_autonomy !== undefined && item.code_autonomy != code_autonomy) return false;
    if (code_province !== undefined && item.code_province != code_province) return false;

    if (name !== undefined && !item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
      return false;
    }

    return true;
  });
}
