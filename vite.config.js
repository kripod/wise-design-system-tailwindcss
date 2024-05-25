import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  plugins: [
    react({ jsxImportSource: "css-homogenizer/reset-scoped/react" }),
    dts(),
  ],
  build: {
    lib: {
      entry: ["./src/index.ts", "./src/tailwind-base.ts"],
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
      ].map((packageName) => new RegExp(`^${packageName}($|/)`, "u")),
      output: {
        preserveModules: true,
      },
    },
  },
});
