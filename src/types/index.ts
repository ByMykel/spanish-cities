import { Geometry } from "geojson";
import { Feature } from "geojson";

interface MultipleProperties {
  [key: string]: string | number;
}

export interface MultipleFeatures {
  [key: string]: Feature<Geometry, MultipleProperties>;
}

export interface optionsAutonomy {
  code?: string | number;
  with_geojson?: boolean;
}

export interface optionsProvince {
  code?: string | number;
  code_autonomy?: string | number;
}

export interface OptionsCity {
  code_autonomy?: string | number;
  code_province?: string | number;
  code_municipality?: string | number;
  extra_digit?: string | number;
}

export interface Autonomy {
  code: string;
  name: string;
  geojson?: Feature<Geometry, MultipleProperties>;
}

export interface Province {
  code: string;
  name: string;
  code_autonomy: string;
}

export interface City {
  code_autonomy: string;
  code_province: string;
  code_municipality: string;
  extra_digit: string;
  name: string;
}
