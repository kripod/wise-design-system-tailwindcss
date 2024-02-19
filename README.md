# @wise/design-system

Web implementation of Wise Design System.

## Usage

### With `@transferwise/components`

1. Install the package:

   ```sh
   pnpm add @wise/design-system
   ```

2. Import styles from your app’s root:

   ```ts
   import "@wise/design-system/styles-legacy.css";
   ```

### Without `@transferwise/components`

1. Install the package, optionally with its referenced fonts:

   ```sh
   pnpm add @wise/design-system @fontsource-variable/inter
   ```

2. Import styles from your app’s root:

   ```ts
   import "@fontsource-variable/inter";
   import "@wise/design-system/styles.css";
   ```

## Contributing

First, start the development server:

```sh
pnpm run dev
```

Then, you may modify components and stories within the `src/` directory and see your changes take place in real time.
