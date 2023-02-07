interface optionsAutonomy {
    code?: string | number;
}
export interface Autonomy {
    code: string;
    name: string;
}
export declare const autonomies: (options?: optionsAutonomy) => Autonomy[];
export {};
