import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-ts";

import pkg from "./package.json" assert { type: "json" };

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.exports.import,
      format: "es",
    },
    {
      file: pkg.exports.require,
      format: "cjs",
      interop: "esModule",
    },
  ],
  external: /node_modules/,
  plugins: [
    nodeResolve(),
    ts({
      transpiler: {
        typescriptSyntax: "typescript",
        otherSyntax: "babel",
      },
    }),
  ],
};
