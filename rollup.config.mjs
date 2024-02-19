import ts from "rollup-plugin-ts";

import pkg from "./package.json" assert { type: "json" };

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.exports["."].import,
      format: "es",
    },
    {
      file: pkg.exports["."].require,
      format: "cjs",
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
