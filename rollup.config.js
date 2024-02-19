const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");
const { defineConfig } = require("rollup");

const pkg = require("./package.json");

const extensions = [".js", ".jsx", ".mjs", ".ts", ".tsx"];

module.exports = defineConfig({
  input: {
    index: "src/index.ts",
  },
  output: [
    {
      format: "es",
      dir: "dist",
      entryFileNames: "[name].mjs",
    },
    {
      format: "cjs",
      dir: "dist",
      interop: "esModule",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ].map((packageName) => new RegExp(`^${packageName}($|/)`, "u")),
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: "runtime",
    }),
    typescript({
      exclude: ["**/*.stories.*"],
      filterRoot: "src",
      outputToFilesystem: true, // Let `tsconfig.tsbuildinfo` be in the root
      noForceEmit: true,
    }),
  ],
});
