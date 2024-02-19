# @wise/design-system-tailwindcss

Experimental web implementation of Wise Design System, based upon Tailwind CSS.

## Usage

### With `@transferwise/components`

1. Install the package:

   ```sh
   pnpm add @wise/design-system-tailwindcss
   ```

2. Import styles from your app’s root:

   ```ts
   import "@wise/design-system-tailwindcss/styles-legacy.css";
   ```

### Without `@transferwise/components`

1. Install the package, optionally with its referenced fonts:

   ```sh
   pnpm add @wise/design-system-tailwindcss @fontsource-variable/inter
   ```

2. Import styles from your app’s root:

   ```ts
   import "@fontsource-variable/inter";
   import "@wise/design-system-tailwindcss/styles.css";
   ```

## Contributing

First, start the development server:

```sh
pnpm run dev
```

Then, you may modify components and stories within the `src/` directory and see your changes take place in real time.
