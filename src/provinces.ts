import { autonomies } from "./autonomies";
import { cities } from "./cities";
import data from "./data/names/provinces.json";
import { optionsProvince, Province } from "./types";

/**
 * Returns an array of provinces that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the province to filter by.
 * @param options.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param options.name A string representing the name of the province to filter by.
 * @param options.with_autonomy A boolean indicating if the result should include the autonomy associated with each province.
 * @param options.with_cities A boolean indicating if the result should include cities associated with each province.
 */
export const provinces = (options: optionsProvince = {}): Province[] => {
  const { code, code_autonomy, name, with_autonomy = false, with_cities = false } = options;

  const filtered = data.filter((province: Province) =>
    (code === undefined || province.code == code) &&
    (code_autonomy === undefined || province.code_autonomy == code_autonomy) &&
    (name === undefined || province.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  );

  return filtered.map((province: Province) => ({
    ...province,
    ...(with_autonomy && { autonomy: autonomies({ code: province.code_autonomy })[0] }),
    ...(with_cities && { cities: cities({ code_province: province.code }) })
  }));
};
