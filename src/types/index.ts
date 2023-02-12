export interface optionsAutonomy {
  code?: string | number;
}

export interface optionsProvince {
  code?: string | number;
  code_autonomous_community?: string | number;
}

export interface OptionsCity {
  code_autonomous_community?: string | number;
  code_province?: string | number;
  code_municipality?: string | number;
  extra_digit?: string | number;
}

export interface Autonomy {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
  code_autonomous_community: string;
}

export interface City {
  code_autonomous_community: string;
  code_province: string;
  code_municipality: string;
  extra_digit: string;
  name: string;
}
