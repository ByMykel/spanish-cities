import data from "./data/names/cities.json";
import { OptionsCity, City } from "./types";

/**
 * Returns an array of cities that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the city to filter by.
 * @param options.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param options.code_province A string or number representing the code of the province to filter by.
 */
export const cities = (options: OptionsCity = {}): City[] => {
  const attributes = ["code_autonomy", "code_province", "code"]
    .filter(option => options[option as keyof OptionsCity] !== undefined);

  return data.filter((item: City) => {
    for (const attribute of attributes) {
      if (item[attribute as keyof OptionsCity] != options[attribute as keyof OptionsCity]) {
        return false;
      }
    }

    return true;
  });
}
