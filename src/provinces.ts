import data from "./data/names/provinces.json";
import { optionsProvince, Province } from "./types";

export const provinces = (options: optionsProvince = {}): Province[] => {
  const attributes = ["code", "code_autonomy"]
    .filter(option => options[option as keyof optionsProvince] !== undefined);

  return data.flatMap((item: Province) => {
    for (const attribute of attributes) {
      if (item[attribute as keyof optionsProvince] != options[attribute as keyof optionsProvince]) {
        return [];
      }
    }

    return [item];
  });
};
