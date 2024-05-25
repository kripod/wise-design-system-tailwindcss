import tailwindBase from "./src/tailwind-base";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [tailwindBase],
};
