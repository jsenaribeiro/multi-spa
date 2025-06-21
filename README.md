# HTML gateway

An agnostic micro-lib for microfrontend with web standard approach.

* **orchestration**: routing and inclusion
* **prefetching**: all content is loaded
* **isolation**: shadow dom isolation
* **fallback**: fallback HTML content
* **routing**: static and dynamic route
* **state**: shared states with globals
* **aids**: api facades for routing

## Installation

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>HTML Container</title>   
   <script src='html-gateway.min.js'></script>
</head>
<body>etc...</body>
</html>
```

## Fullstack support

Client-sider support with script loading and parser to server-side rendering.

```ts
'use server'

import { parser } from 'html-gateway'

await parser(html).build('/build')
```

## Sloting, routing and fallbacks

HTML+ slot supports merged frontends withwith loading content as fallback. It supports declarative static and dynamic routes.

```html
<body>
   <slot src='http://app.vue.com'>loading...</slot>
   <slot route='/' src='http://app.react.com'>loading...</slot>   
   <slot route='/user/:id' src='http://app.angular.com'>loading...</slot>
</body>
```

## Metatags reallocation

All metatag and head content in slot is dynamically allocated to html page. But the SEO only impacted with this metatag reallocated in server by server-side html-container.


