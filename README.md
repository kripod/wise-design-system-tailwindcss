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

1. Add Tailwind-related optional peer dependencies:

```sh
pnpm add -D tailwindcss @tailwindcss/container-queries
```

2. Add `tailwind.config.ts` to your project root, following [this Next.js framework guide](https://tailwindcss.com/docs/guides/nextjs):

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

The [Preflight](https://tailwindcss.com/docs/preflight) core plugin is disabled, as base styles are provided by [modern-normalize](https://github.com/sindresorhus/modern-normalize) and [css-homogenizer](https://github.com/kripod/css-homogenizer) below.

3. Add `src/globals.css`:

```css
@import "@wise/design-system-tailwindcss/preflight.css";
/* TODO: Use global reset to simplify styling once the app is ready for it */
/* @import "css-homogenizer/reset.css"; */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Without Tailwind CSS

Import legacy styles from your app’s root:

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
