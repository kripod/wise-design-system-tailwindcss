const { getBabelOutputPlugin } = require("@rollup/plugin-babel");
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
    }),
    getBabelOutputPlugin({
      presets: [["@babel/preset-env", { bugfixes: true }]],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          { version: pkg.dependencies["@babel/runtime"] },
        ],
        ["babel-plugin-optimize-clsx", { functionNames: ["clsx"] }],
      ],
    }),
  ],
});
