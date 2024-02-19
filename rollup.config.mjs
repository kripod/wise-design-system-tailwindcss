import ts from "rollup-plugin-ts";

import pkg from "./package.json" assert { type: "json" };

/** @type {import("rollup").RollupOptions} */
export default {
  input: {
    index: "src/index.ts",
  },
  output: [
    {
      format: "es",
      dir: "dist/es",
    },
    {
      format: "cjs",
      dir: "dist/cjs",
      interop: "esModule",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ].map((packageName) => new RegExp(`^${packageName}($|/)`)),
  plugins: [
    ts({
      transpiler: {
        typescriptSyntax: "typescript",
        otherSyntax: "babel",
      },
    }),
  ],
};
