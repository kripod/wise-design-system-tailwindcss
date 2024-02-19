const pkg = require("./package.json");

const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].map((packageName) => new RegExp(`^${packageName}($|/)`, "u"));

module.exports = {
  plugins: {
    "postcss-import": {
      filter: (/** @type {string} */ url) =>
        !external.some((name) => name.test(url)),
    },
    "@csstools/postcss-rebase-url": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    "postcss-preset-env": {
      features: {
        "float-clear-logical-values": false,
        "logical-overflow": false,
        "logical-overscroll-behavior": false,
        "logical-properties-and-values": false,
        "logical-resize": false,
        "logical-viewport-units": false,
        "nesting-rules": false,
      },
    },
  },
};
