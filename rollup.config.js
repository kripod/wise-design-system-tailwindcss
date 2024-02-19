const { babel } = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");
const { defineConfig } = require("rollup");

const pkg = require("./package.json");

const rootDir = "src";
const outDir = "dist";

module.exports = defineConfig({
  input: {
    index: `${rootDir}/index.ts`,
  },
  output: [
    {
      format: "es",
      dir: outDir,
      entryFileNames: "[name].mjs",
    },
    {
      format: "cjs",
      dir: outDir,
      interop: "auto",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ].map((packageName) => new RegExp(`^${packageName}($|/)`, "u")),
  plugins: [
    typescript({
      exclude: ["**/*.stories.*"],
      filterRoot: rootDir,
      compilerOptions: {
        outDir,
      },
    }),
    babel({
      extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"],
      babelHelpers: "runtime",
    }),
  ],
});
