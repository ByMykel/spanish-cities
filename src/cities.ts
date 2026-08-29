import { autonomies as selectAutonomies } from "./standalone/autonomies";
import { cities as selectCities } from "./standalone/cities";
import { provinces as selectProvinces } from "./standalone/provinces";
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

  const filtered = selectCities({ code, code_autonomy, code_province, name });

  if (!with_autonomy && !with_province) {
    return filtered;
  }

  return filtered.map((city: City) => ({
    ...city,
    ...(with_autonomy && { autonomy: selectAutonomies({ code: city.code_autonomy })[0] }),
    ...(with_province && { province: selectProvinces({ code: city.code_province })[0] })
  }));
}
