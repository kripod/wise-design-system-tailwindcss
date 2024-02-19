# @wise/design-system-tailwindcss

Experimental web implementation of Wise Design System, based upon Tailwind CSS.

## Usage

Firstly, install the package and its peer dependencies (besides React):

```sh
pnpm add @wise/design-system-tailwindcss @transferwise/icons css-homogenizer
```

Fonts shall be loaded separately through `@transferwise/neptune-css`, by importing either of these styles:

- `@transferwise/neptune-css/dist/css/neptune-core.css`
- `@transferwise/neptune-css/dist/css/neptune.css`

### With Tailwind CSS

1. Add build-time dependencies:

   ```sh
   pnpm add -D tailwindcss @tailwindcss/container-queries postcss postcss-import postcss-preset-env
   ```

2. Add `postcss.config.js` to your project root:

   ```js
   module.exports = {
     plugins: {
       "postcss-import": {},
       "tailwindcss/nesting": "postcss-nesting",
       tailwindcss: {},
       "postcss-preset-env": {
         features: { "nesting-rules": false },
       },
     },
   };
   ```

   This config:

   - Inlines `@import` statements
   - Uses [official CSS Nesting syntax](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting) over the [Sass-like one](https://github.com/postcss/postcss-nested)
   - Provides extensive browser support via [Browserslist](https://github.com/browserslist/browserslist)

3. Within your TSConfig, use `"moduleResolution": "Bundler"` or `"moduleResolution": "NodeNext"`. Package entry points may fail to resolve otherwise.

4. Add `tailwind.config.ts` to your project root, following [this Next.js framework guide](https://tailwindcss.com/docs/guides/nextjs):

   ```ts
   import * as path from "node:path";

   import type { Config } from "tailwindcss";

   import tailwindBase from "@wise/design-system-tailwindcss/tailwind-base";

   export default {
     content: [
       "./src/**/*.{js,jsx,ts,tsx,mdx}",
       path.join(
         path.dirname(require.resolve("@wise/design-system-tailwindcss")),
         "**/*.js",
       ),
     ],
     presets: [tailwindBase],
   } satisfies Config;
   ```

   The [Preflight](https://tailwindcss.com/docs/preflight) core plugin is disabled, as base styles are provided by [modern-normalize](https://github.com/sindresorhus/modern-normalize) and [css-homogenizer](https://github.com/kripod/css-homogenizer).

5. Add `src/styles.css` and import it from your app’s root:

   ```css
   @import "tailwindcss/base";
   @import "@wise/design-system-tailwindcss/preflight.css";
   /* TODO: Use global reset to simplify styling once the app is ready for it */
   /* @import "css-homogenizer/reset.css"; */

   @import "tailwindcss/components";

   @import "tailwindcss/utilities";
   ```

### Without Tailwind CSS (not recommended)

Import these styles from your app’s root:

```ts
import "@wise/design-system-tailwindcss/preflight.css";
import "@wise/design-system-tailwindcss/pregenerated.css";
```

## Contributing

First, start the development server:

```sh
pnpm run dev
```

Then, you may modify components and stories within the `src/` directory and see your changes take place in real time.
