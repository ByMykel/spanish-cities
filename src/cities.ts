import data from "./data";

interface City {
  code_autonomous_community: string;
  code_province: string;
  code_municipality: string;
  extra_digit: string;
  name: string;
}

interface Filters {
  code_autonomous_community?: string | number;
  code_province?: string | number;
  code_municipality?: string | number;
  extra_digit?: string | number;
}

const filterCities = (item: City, filters: Filters) => {
  const {
    code_autonomous_community,
    code_province,
    code_municipality,
    extra_digit,
  } = filters;

  const options = [];

  if (code_autonomous_community !== undefined) {
    options.push({ code_autonomous_community });
  }

  if (code_province !== undefined) {
    options.push({ code_province });
  }

  if (code_municipality !== undefined) {
    options.push({ code_municipality });
  }

  if (extra_digit !== undefined) {
    options.push({ extra_digit });
  }

  return options.every((option) => {
    const key = Object.keys(option)[0];
    return item[key as keyof City] == option[key as keyof Filters];
  });
};

export const getCities = (filters: Filters) => {
  return data.cities.filter((item) => filterCities(item, filters));
};