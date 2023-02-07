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
export declare const cities: (options?: OptionsCity) => City[];
export {};
