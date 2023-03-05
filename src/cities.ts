import data from "./data/names/cities.json";
import { OptionsCity, City } from "./types";

export const cities = (options: OptionsCity = {}): City[] => {
  const attributes = ["code_autonomy", "code_province", "code_municipality", "extra_digit"]
    .filter(option => options[option as keyof OptionsCity] !== undefined);

  return data.flatMap((item: City) => {
    for (const attribute of attributes) {
      if (item[attribute as keyof OptionsCity] != options[attribute as keyof OptionsCity]) {
        return [];
      }
    }

    return [item];
  });
}
