import data from "./data";
import { OptionsCity, City } from "./types";

export const cities = (options: OptionsCity = {}): City[] => {
  const attributes = ["code_autonomous_community", "code_province", "code_municipality", "extra_digit"]
    .filter(option => options[option as keyof OptionsCity] !== undefined);

  return data.cities.filter((item) => {
    for (const attribute of attributes) {
      if (item[attribute as keyof OptionsCity] != options[attribute as keyof OptionsCity]) {
        return false;
      }
    }

    return true;
  });
}
