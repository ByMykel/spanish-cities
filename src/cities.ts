import data from "./data/names/cities.json";
import { OptionsCity, City } from "./types";

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
