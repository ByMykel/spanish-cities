export interface Autonomy {
    code: string;
    name: string;
}
interface AutonomyOptions {
    with_code?: boolean;
    code?: string | number;
}
export declare const autonomies: (options?: AutonomyOptions) => Autonomy[] | string[] | Autonomy | string | undefined;
export {};
