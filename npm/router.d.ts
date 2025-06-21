interface Router {
    goto(route: string): void;
    match(route: string): {
        routed: boolean;
        params: object;
    };
    readonly now: string;
}
export declare const router: Router;
export {};
