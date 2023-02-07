import data from "./data";
interface OptionsCity {
  code_autonomous_community?: string | number;
  code_province?: string | number;
  code_municipality?: string | number;
  extra_digit?: string | number;
}

export interface City {
  code_autonomous_community: string;
  code_province: string;
  code_municipality: string;
  extra_digit: string;
  name: string;
}

export const cities = (options: OptionsCity = {}): City[] => {
  const {
    code_autonomous_community,
    code_province,
    code_municipality,
    extra_digit,
  } = options;

  return data.cities.filter((item) => {
    if (code_autonomous_community !== undefined) {
      if (item.code_autonomous_community != code_autonomous_community) {
        return false;
      }
    }

    if (code_province !== undefined) {
      if (item.code_province != code_province) {
        return false;
      }
    }

    if (code_municipality !== undefined) {
      if (item.code_municipality != code_municipality) {
        return false;
      }
    }

    if (extra_digit !== undefined) {
      if (item.extra_digit != extra_digit) {
        return false;
      }
    }

    return true;
  });
}
