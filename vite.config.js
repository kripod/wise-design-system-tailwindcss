import react from "@vitejs/plugin-react-swc";
import browserslist from "browserslist";
import swc from "unplugin-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkg from "./package.json" with { type: "json" };

const jsxImportSource = "css-homogenizer/reset-scoped/react";

export default defineConfig((env) => ({
  plugins:
    env.mode !== "production"
      ? [react({ jsxImportSource })]
      : [
          swc.vite({
            tsconfigFile: false,
            env: {
              targets: browserslist(),
              bugfixes: true,
            },
            jsc: {
              externalHelpers: true,
              transform: {
                react: {
                  runtime: "automatic",
                  importSource: jsxImportSource,
                },
              },
            },
          }),
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
}));
