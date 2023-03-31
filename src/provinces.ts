import data from "./data/names/provinces.json";
import { optionsProvince, Province } from "./types";

/**
 * Returns an array of provinces that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the province to filter by.
 * @param options.code_autonomy A string or number representing the code of the autonomy to filter by.
 */
export const provinces = (options: optionsProvince = {}): Province[] => {
  const attributes = ["code", "code_autonomy"]
    .filter(option => options[option as keyof optionsProvince] !== undefined);

  return data.filter((item: Province) => {
    for (const attribute of attributes) {
      if (item[attribute as keyof optionsProvince] != options[attribute as keyof optionsProvince]) {
        return false;
      }
    }
    return true;
  });
};
