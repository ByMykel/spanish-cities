import { autonomies } from "./autonomies";
import { cities } from "./cities";
import data from "./data/provinces.json";
import { FiltersProvince, Province } from "./types";

/**
 * Returns an array of provinces that match the specified filter criteria.
 * @param filters (optional) An object with filters.
 * @param filters.code A string or number representing the code of the province to filter by.
 * @param filters.code_autonomy A string or number representing the code of the autonomy to filter by.
 * @param filters.name A string representing the name of the province to filter by.
 * @param filters.with_autonomy A boolean indicating if the result should include the autonomy associated with each province.
 * @param filters.with_cities A boolean indicating if the result should include cities associated with each province.
 */
export const provinces = (filters: FiltersProvince = {}): Province[] => {
  const { code, code_autonomy, name, with_autonomy = false, with_cities = false } = filters;

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
