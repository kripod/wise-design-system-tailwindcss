import pkg from "./package.json" assert { type: "json" };

/** @type {import("@babel/core").TransformOptions} */
export default {
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
