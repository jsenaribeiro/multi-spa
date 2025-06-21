interface Router {
    readonly now: string;
    goto(route: string): void;
    match(route: string): boolean;
    params<T extends object = any>(route: string): T;
    queries: Record<string, string>;
}
export declare const router: Router;
export {};
