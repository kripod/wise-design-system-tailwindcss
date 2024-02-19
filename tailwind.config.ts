import containerQueriesPlugin from "@tailwindcss/container-queries";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import { darkTheme, lightTheme } from "./themes";

function roundTo(value: number, fractionDigits: number) {
  return Number(
    `${Math.round(Number(`${value}e+${fractionDigits}`))}e-${fractionDigits}`,
  );
}

function pxToRem(value: number) {
  return `${roundTo(value / 16, 4)}rem`;
}

export default {
  content: ["./src/**/*.{js,jsx,mjs,ts,tsx,mts}"],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true,
  },
  darkMode: "class",
  theme: {
    borderRadius: {
      none: "0px",
      xs: pxToRem(2),
      DEFAULT: pxToRem(10),
      md: pxToRem(16),
      lg: pxToRem(24),
      xl: pxToRem(32),
      full: "9999px",
    },
    boxShadow: {
      DEFAULT: "0 2px 4px rgb(69 71 69 / 0.35)", // TODO: Change color
      xl: "0 0 40px rgb(69 71 69 / 0.2)", // TODO: Change color
      none: "none",
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      content: {
        primary: `var(--color-content-primary, ${lightTheme["--color-content-primary"]})`,
        secondary: `var(--color-content-secondary, ${lightTheme["--color-content-secondary"]})`,
        tertiary: `var(--color-content-tertiary, ${lightTheme["--color-content-tertiary"]})`,
        link: {
          DEFAULT: `var(--color-content-link, ${lightTheme["--color-content-link"]})`,
          hover: `var(--color-content-link-hover, ${lightTheme["--color-content-link-hover"]})`,
          active: `var(--color-content-link-active, ${lightTheme["--color-content-link-active"]})`,
        },
      },
      interactive: {
        primary: {
          DEFAULT: `var(--color-interactive-primary, ${lightTheme["--color-interactive-primary"]})`,
          hover: `var(--color-interactive-primary-hover, ${lightTheme["--color-interactive-primary-hover"]})`,
          active: `var(--color-interactive-primary-active, ${lightTheme["--color-interactive-primary-active"]})`,
        },
        accent: {
          DEFAULT: `var(--color-interactive-accent, ${lightTheme["--color-interactive-accent"]})`,
          hover: `var(--color-interactive-accent-hover, ${lightTheme["--color-interactive-accent-hover"]})`,
          active: `var(--color-interactive-accent-active, ${lightTheme["--color-interactive-accent-active"]})`,
        },
        secondary: {
          DEFAULT: `var(--color-interactive-secondary, ${lightTheme["--color-interactive-secondary"]})`,
          hover: `var(--color-interactive-secondary-hover, ${lightTheme["--color-interactive-secondary-hover"]})`,
          active: `var(--color-interactive-secondary-active, ${lightTheme["--color-interactive-secondary-active"]})`,
        },
        control: {
          DEFAULT: `var(--color-interactive-control, ${lightTheme["--color-interactive-control"]})`,
          hover: `var(--color-interactive-control-hover, ${lightTheme["--color-interactive-control-hover"]})`,
          active: `var(--color-interactive-control-active, ${lightTheme["--color-interactive-control-active"]})`,
        },
      },
      background: {
        screen: {
          DEFAULT: `var(--color-background-screen, ${lightTheme["--color-background-screen"]})`,
          hover: `var(--color-background-screen-hover, ${lightTheme["--color-background-screen-hover"]})`,
          active: `var(--color-background-screen-active, ${lightTheme["--color-background-screen-active"]})`,
        },
        elevated: `var(--color-background-elevated, ${lightTheme["--color-background-elevated"]})`,
        neutral: {
          DEFAULT: `var(--color-background-neutral, ${lightTheme["--color-background-neutral"]})`,
          hover: `var(--color-background-neutral-hover, ${lightTheme["--color-background-neutral-hover"]})`,
          active: `var(--color-background-neutral-active, ${lightTheme["--color-background-neutral-active"]})`,
        },
        overlay: `var(--color-background-overlay, ${lightTheme["--color-background-overlay"]})`,
      },
      border: {
        neutral: `var(--color-border-neutral, ${lightTheme["--color-border-neutral"]})`,
        overlay: `var(--color-border-overlay, ${lightTheme["--color-border-overlay"]})`,
      },
      sentiment: {
        negative: {
          DEFAULT: `var(--color-sentiment-negative, ${lightTheme["--color-sentiment-negative"]})`,
          hover: `var(--color-sentiment-negative-hover, ${lightTheme["--color-sentiment-negative-hover"]})`,
          active: `var(--color-sentiment-negative-active, ${lightTheme["--color-sentiment-negative-active"]})`,
        },
        positive: `var(--color-sentiment-positive, ${lightTheme["--color-sentiment-positive"]})`,
        warning: `var(--color-sentiment-warning, ${lightTheme["--color-sentiment-warning"]})`,
      },
      contrast: {
        theme: `var(--color-contrast-theme, ${lightTheme["--color-contrast-theme"]})`,
        overlay: `var(--color-contrast-overlay, ${lightTheme["--color-contrast-overlay"]})`,
      },
      base: {
        light: `var(--color-base-light, ${lightTheme["--color-base-light"]})`,
        dark: `var(--color-base-dark, ${lightTheme["--color-base-dark"]})`,
      },
    }),
    fontFamily: {
      sans: ['"Inter Variable"', '"Inter"', "ui-sans-serif", "system-ui"],
    },
    fontSize: {
      xs: [
        pxToRem(12),
        {
          lineHeight: pxToRem(18),
          letterSpacing: "0em",
          fontWeight: "500",
        },
      ],
      sm: [
        pxToRem(14),
        {
          lineHeight: pxToRem(22),
          letterSpacing: "-0.006em",
        },
      ],
      base: [
        pxToRem(16),
        {
          lineHeight: pxToRem(24),
          letterSpacing: "-0.011em",
        },
      ],
      lg: [
        pxToRem(18),
        {
          lineHeight: pxToRem(24),
          letterSpacing: "-0.014em",
          fontWeight: "600",
        },
      ],
      xl: [
        pxToRem(22),
        {
          lineHeight: pxToRem(28),
          letterSpacing: "-0.018em",
          fontWeight: "600",
        },
      ],
      "2xl": [
        pxToRem(26),
        {
          lineHeight: pxToRem(32),
          letterSpacing: "-0.02em",
          fontWeight: "600",
        },
      ],
      "3xl": [
        pxToRem(30),
        {
          lineHeight: pxToRem(34),
          letterSpacing: "-0.021em",
          fontWeight: "600",
        },
      ],
      "5xl": [
        pxToRem(40),
        {
          lineHeight: "0.85",
          letterSpacing: "0em",
          fontWeight: "700",
        },
      ],
      "6xl": [
        pxToRem(52),
        {
          lineHeight: "0.85",
          letterSpacing: "0em",
          fontWeight: "700",
        },
      ],
      "7xl": [
        pxToRem(64),
        {
          lineHeight: "0.85",
          letterSpacing: "0em",
          fontWeight: "700",
        },
      ],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    letterSpacing: {
      normal: "0em",
      tight: "-0.022em",
    },
    lineHeight: {
      tight: "0.85",
      none: "1",
      4.5: pxToRem(18),
      5.5: pxToRem(22),
      6: pxToRem(24),
      7: pxToRem(28),
      8: pxToRem(32),
      8.5: pxToRem(34),
      11: pxToRem(44),
    },
    opacity: {
      0: "0",
      40: "0.4",
      45: "0.45", // TODO: Remove if needed
      100: "1",
    },
    outlineOffset: {
      DEFAULT: "2px",
    },
    outlineWidth: {
      0: "0px",
      DEFAULT: "2px",
    },
    ringWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      3: "3px",
    },
    screens: {
      // TODO: Review
      /*
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      */
      desktop: "1024px",
    },
    spacing: {
      px: "1px",
      0: "0px",
      1: pxToRem(4),
      2: pxToRem(8),
      // 2.5: pxToRem(10),
      3: pxToRem(12), // TODO: Remove if needed
      4: pxToRem(16),
      6: pxToRem(24),
      8: pxToRem(32),
      10: pxToRem(40),
      12: pxToRem(48),
      14: pxToRem(56),
      // 16: pxToRem(64),
      18: pxToRem(72),
      // 20: pxToRem(80),
      // 22: pxToRem(88),
      // 24: pxToRem(96),
      // 26: pxToRem(104),
      // 28: pxToRem(112),
      // 30: pxToRem(120),
      // 32: pxToRem(128),
    },
    textUnderlineOffset: {
      auto: "auto",
      3: "3px",
    },
    extend: {
      aria: {
        invalid: 'invalid="true"',
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.border.neutral"),
      }),
      minHeight: ({ theme }) => ({
        12: theme("spacing.12"),
        18: theme("spacing.18"),
      }),
      outlineColor: ({ theme }) => ({
        DEFAULT: theme("colors.interactive.primary.DEFAULT"),
      }),
      transitionTimingFunction: {
        DEFAULT: defaultTheme.transitionTimingFunction.out,
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    containerQueriesPlugin,
    plugin(({ addComponents }) => {
      addComponents({
        ".theme-light": lightTheme,
        ".theme-dark": darkTheme,
        ".theme-invert": {
          ...darkTheme,
          ".theme-light &": darkTheme,
          ".theme-dark &": lightTheme,
        },
      });
    }),
  ],
} satisfies Config;
