export interface FiltersAutonomyBase {
  code?: string | number;
  name?: string;
}

export interface FiltersProvinceBase {
  code?: string | number;
  code_autonomy?: string | number;
  name?: string;
}

export interface FiltersCityBase {
  code?: string | number;
  code_autonomy?: string | number;
  code_province?: string | number;
  name?: string;
}

export interface FiltersAutonomy extends FiltersAutonomyBase {
  with_provinces?: boolean;
  with_cities?: boolean;
}

export interface FiltersProvince extends FiltersProvinceBase {
  with_autonomy?: boolean;
  with_cities?: boolean;
}

export interface FiltersCity extends FiltersCityBase {
  with_autonomy?: boolean;
  with_province?: boolean;
}

export interface Autonomy {
  code: string;
  name: string;
  flag: string;
  coat_of_arms: string;
  has_flag: boolean;
  has_coat_of_arms: boolean;
  provinces?: Province[]
  cities?: City[]
}

export interface Province {
  code: string;
  name: string;
  code_autonomy: string;
  flag: string;
  coat_of_arms: string;
  has_flag: boolean;
  has_coat_of_arms: boolean;
  autonomy?: Autonomy
  cities?: City[]
}

export interface City {
  code: string;
  name: string;
  code_autonomy: string;
  code_province: string;
  flag: string;
  coat_of_arms: string;
  has_flag: boolean;
  has_coat_of_arms: boolean;
  autonomy?: Autonomy
  province?: Province
}
