import data from "./data";

interface optionsProvince {
  code?: string | number;
  code_autonomous_community?: string | number;
}
export interface Province {
  code: string;
  name: string;
  code_autonomous_community: string;
}

export const provinces = (options: optionsProvince = {}): Province[] => {
  const attributes = ["code", "code_autonomous_community"].filter(option => options[option as keyof optionsProvince] !== undefined);

  return data.provinces.filter((item) => {
    for (const attribute of attributes) {
      if (item[attribute as keyof optionsProvince] != options[attribute as keyof optionsProvince]) {
        return false;
      }
    }
    return true;
  });
};
