import data from "./data/names/provinces.json";
import { optionsProvince, Province } from "./types";

/**
 * Returns an array of provinces that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the province to filter by.
 * @param options.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param options.name A string representing the name of the province to filter by.
 */
export const provinces = (options: optionsProvince = {}): Province[] => {
  const { code, code_autonomy, name } = options;

  return data.filter((item: Province) => {
    if (code !== undefined && item.code != code) return false;
    if (code_autonomy !== undefined && item.code_autonomy != code_autonomy) return false;

    if (name !== undefined && !item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
      return false;
    }

    return true;
  });
};
