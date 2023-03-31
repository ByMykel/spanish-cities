export interface optionsAutonomy {
  code?: string | number;
}

export interface optionsProvince {
  code?: string | number;
  code_autonomy?: string | number;
}

export interface OptionsCity {
  code?: string | number;
  code_autonomy?: string | number;
  code_province?: string | number;
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
