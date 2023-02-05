interface Filters {
    code_autonomous_community?: string | number;
    code_province?: string | number;
    code_municipality?: string | number;
    extra_digit?: string | number;
}
export declare const getCities: (filters: Filters) => {
    name: string;
    code_autonomous_community: string;
    code_province: string;
    code_municipality: string;
    extra_digit: string;
}[];
export {};
