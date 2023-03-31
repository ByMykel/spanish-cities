export interface optionsAutonomy {
  code?: string | number;
  name?: string;
}

export interface optionsProvince {
  code?: string | number;
  code_autonomy?: string | number;
  name?: string;
}

export interface OptionsCity {
  code?: string | number;
  code_autonomy?: string | number;
  code_province?: string | number;
  name?: string;
}

export interface Autonomy {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
  code_autonomy: string;
}

export interface City {
  code: string;
  name: string;
  code_autonomy: string;
  code_province: string;
}
