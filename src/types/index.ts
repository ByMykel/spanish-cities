/** Filters that need only the autonomies dataset. */
export interface FiltersAutonomyBase {
  code?: string | number;
  name?: string;
}

/** Filters that need only the provinces dataset. */
export interface FiltersProvinceBase {
  code?: string | number;
  code_autonomy?: string | number;
  name?: string;
}

/** Filters that need only the cities dataset. */
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
  /** Always a URL. Falls back to the placeholder when `has_flag` is false. */
  flag: string;
  /** Always a URL. Falls back to the placeholder when `has_coat_of_arms` is false. */
  coat_of_arms: string;
  /** False when no flag is known and `flag` holds the placeholder. */
  has_flag: boolean;
  /** False when no coat of arms is known and `coat_of_arms` holds the placeholder. */
  has_coat_of_arms: boolean;
  provinces?: Province[]
  cities?: City[]
}

export interface Province {
  code: string;
  name: string;
  code_autonomy: string;
  /** Always a URL. Falls back to the placeholder when `has_flag` is false. */
  flag: string;
  /** Always a URL. Falls back to the placeholder when `has_coat_of_arms` is false. */
  coat_of_arms: string;
  /** False when no flag is known and `flag` holds the placeholder. */
  has_flag: boolean;
  /** False when no coat of arms is known and `coat_of_arms` holds the placeholder. */
  has_coat_of_arms: boolean;
  autonomy?: Autonomy
  cities?: City[]
}

export interface City {
  code: string;
  name: string;
  code_autonomy: string;
  code_province: string;
  /** Always a URL. Falls back to the placeholder when `has_flag` is false. */
  flag: string;
  /** Always a URL. Falls back to the placeholder when `has_coat_of_arms` is false. */
  coat_of_arms: string;
  /** False when no flag is known and `flag` holds the placeholder. */
  has_flag: boolean;
  /** False when no coat of arms is known and `coat_of_arms` holds the placeholder. */
  has_coat_of_arms: boolean;
  autonomy?: Autonomy
  province?: Province
}
