import data from "./data";
import { optionsProvince, Province } from "./types";

export const provinces = (options: optionsProvince = {}): Province[] => {
  const attributes = ["code", "code_autonomous_community"]
    .filter(option => options[option as keyof optionsProvince] !== undefined);

  return data.provinces.filter((item) => {
    for (const attribute of attributes) {
      if (item[attribute as keyof optionsProvince] != options[attribute as keyof optionsProvince]) {
        return false;
      }
    }
    return true;
  });
};
