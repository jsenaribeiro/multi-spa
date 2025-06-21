# Multi SPA

An agnostic micro-lib for microfrontend with web standard approach.

* **orchestration**: routing and inclusion support
* **prefetching**: all content is preloaded
* **isolation**: shadow dom isolation
* **fallback**: fallback HTML content
* **routing**: static and dynamic route

## Installation

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Multi SPA</title>   
   <script src='multi-spa.min.js'></script>
</head>
<body>etc...</body>
</html>
```

## Fullstack support

Client-sider support with script loading and parser to server-side rendering.

```ts
'use server'

import { parser } from 'multi-spa'

await parser(html).build('/build')
```

## Routing and fallbacks

HTML+ slot supports merged frontends withwith loading content as fallback. It supports declarative static and dynamic routes.

```html
<body>
   <slot src='http://app.vue.com'>loading...</slot>
   <slot route='/' src='http://app.react.com'>loading...</slot>   
   <slot route='/user/:id' src='http://app.angular.com'>loading...</slot>
</body>
```

## Metatags reallocation

Metatags are  dynamically reallocated to html page. To work properly with SEO, it demands the usasge of server-side multi-spa parser.

## Router facade

Simple global router object facade to location and history.

```ts
router.now 
router.goto('/admin')
router.params('/admin/:id')
router.queries // URLSearchParams as object
```
