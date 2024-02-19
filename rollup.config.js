const { babel } = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");
const { defineConfig } = require("rollup");

const pkg = require("./package.json");

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
    typescript({
      exclude: ["**/*.stories.*"],
      filterRoot: "src",
      outputToFilesystem: true, // Let `tsconfig.tsbuildinfo` be in the root
    }),
    babel({
      extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"],
      babelHelpers: "runtime",
    }),
  ],
});
