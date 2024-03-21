import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: ["../src/"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      strictMode: true,
    },
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-themes",
  ],
  core: {
    disableTelemetry: true,
  },
} satisfies StorybookConfig;
