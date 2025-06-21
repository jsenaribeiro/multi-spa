interface Router {
   goto(route: string): void
   match(route: string): { routed: boolean, params: object }
   readonly now: string
}

export const router: Router = {
   get now() { return location.pathname },
   goto(route: string) { history.pushState({}, "", route) },
   match(route: string) {
      const names = [] as string[];
      const regex = new RegExp('^' + route.replace(/:([^/]+)/g, (_, k) => (names.push(k), '([^/]+)')) + '$')
      const result = location.pathname.match(regex);
      const entries = result && names.map((k, i) => [k, result[i + 1]])
      const params = entries ? Object.fromEntries(entries) : {}
      return { routed: !!result, params };
   }
}