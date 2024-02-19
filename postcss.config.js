import pkg from "./package.json" assert { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
].map((packageName) => new RegExp(`^${packageName}($|/)`));

export default {
  plugins: {
    "postcss-import": {
      filter: (url) => !external.some((name) => name.test(url)),
    },
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
  },
};
