const pkg = require("./package.json");

/** @type {import("@babel/core").TransformOptions} */
module.exports = {
  presets: [
    ["@babel/preset-env", { bugfixes: true }],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        importSource: "css-homogenizer/reset-scoped/react",
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      { version: pkg.dependencies["@babel/runtime"] },
    ],
    ["babel-plugin-optimize-clsx", { functionNames: ["clsx"] }],
  ],
};
