const ts = require("rollup-plugin-ts");

const pkg = require("./package.json");

/** @type {import("rollup").RollupOptions} */
module.exports = {
  input: {
    index: "src/index.ts",
    _canary: "src/index-canary.ts",
  },
  output: [
    {
      format: "es",
      dir: "dist/es",
      entryFileNames: "[name].mjs",
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
  ].map((packageName) => new RegExp(`^${packageName}($|/)`, "u")),
  plugins: [
    ts({
      transpiler: {
        typescriptSyntax: "typescript",
        otherSyntax: "babel",
      },
    }),
  ],
};
