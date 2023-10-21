type Nullable<T> = T | null;

export interface FiltersAutonomy {
  code?: string | number;
  name?: string;
  with_provinces?: boolean;
  with_cities?: boolean;
}

export interface FiltersProvince {
  code?: string | number;
  code_autonomy?: string | number;
  name?: string;
  with_autonomy?: boolean;
  with_cities?: boolean;
}

export interface FiltersCity {
  code?: string | number;
  code_autonomy?: string | number;
  code_province?: string | number;
  name?: string;
  with_autonomy?: boolean;
  with_province?: boolean;
}

export interface Autonomy {
  code: string;
  name: string;
  flag: Nullable<string>;
  coat_of_arms: Nullable<string>;
  provinces?: Province[]
  cities?: City[]
}

export interface Province {
  code: string;
  name: string;
  code_autonomy: string;
  flag: Nullable<string>;
  coat_of_arms: Nullable<string>;
  autonomy?: Autonomy
  cities?: City[]
}

export interface City {
  code: string;
  name: string;
  code_autonomy: string;
  code_province: string;
  flag: Nullable<string>;
  coat_of_arms: Nullable<string>;
  autonomy?: Autonomy
  province?: Province
}
