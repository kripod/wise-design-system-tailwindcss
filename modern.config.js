import { defineConfig, moduleTools } from "@modern-js/module-tools";

export default defineConfig({
  plugins: [moduleTools()],
  buildPreset: "npm-component-es2017",
  buildConfig: {
    sourceMap: true,
    externalHelpers: true,
  },
});
