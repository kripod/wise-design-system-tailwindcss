const { babel } = require("@rollup/plugin-babel");
const { default: typescript } = require("@rollup/plugin-typescript");
const { defineConfig } = require("rollup");

const pkg = require("./package.json");

const rootDir = "src";
const outDir = "dist";

module.exports = defineConfig({
  input: {
    index: `${rootDir}/index.ts`,
    "tailwind-base": `${rootDir}/tailwind-base.ts`,
  },
  output: [
    {
      format: "es",
      dir: outDir,
      preserveModules: true,
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name]-[hash].mjs",
    },
    {
      format: "cjs",
      dir: outDir,
      preserveModules: true,
      interop: "auto",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ].map((packageName) => new RegExp(`^${packageName}($|/)`, "u")),
  plugins: [
    typescript({
      exclude: ["**/*.stories.*", "**/*.test.*"],
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
