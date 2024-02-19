import "@fontsource-variable/inter";
import "./styles.css";

import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";

export default {
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "theme-light",
        dark: "theme-dark",
        "light-green": "theme-light-green",
        "dark-green": "theme-dark-green",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    backgrounds: {
      default: "screen",
      values: [
        {
          name: "screen",
          value: "var(--color-background-screen)",
        },
        {
          name: "elevated",
          value: "var(--color-background-elevated)",
        },
        {
          name: "neutral",
          value: "var(--color-background-neutral)",
        },
        {
          name: "overlay",
          value: "var(--color-background-overlay)",
        },
      ],
      grid: {
        cellSize: 8,
        cellAmount: 4,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/iu,
        date: /date$/iu,
      },
    },
  },
} satisfies Preview;
