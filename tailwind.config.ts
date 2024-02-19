import type { Config } from "tailwindcss";

import tailwindBase from "./src/tailwind-base";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [tailwindBase],
} satisfies Config;
