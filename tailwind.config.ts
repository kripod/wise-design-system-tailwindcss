import containerQueriesPlugin from "@tailwindcss/container-queries";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

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
      xl: "0 0 40px rgb(69 71 69 / 0.2)", // TODO: Change color
      none: "none",
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      content: {
        primary: "var(--color-content-primary, rgb(14 15 12))",
        secondary: "var(--color-content-secondary, rgb(69 71 69))",
        tertiary: "var(--color-content-tertiary, rgb(106 108 106))",
        link: {
          DEFAULT: "var(--color-content-link, rgb(22 51 0))",
          hover: "var(--color-content-link-hover, rgb(13 31 0))",
          active: "var(--color-content-link-active, rgb(14 15 12))",
        },
      },
      interactive: {
        primary: {
          DEFAULT: "var(--color-interactive-primary, rgb(22 51 0))",
          hover: "var(--color-interactive-primary-hover, rgb(13 31 0))",
          active: "var(--color-interactive-primary-active, rgb(14 15 12))",
        },
        accent: {
          DEFAULT: "var(--color-interactive-accent, rgb(159 232 112))",
          hover: "var(--color-interactive-accent-hover, rgb(128 225 66))",
          active: "var(--color-interactive-accent-active, rgb(101 207 33))",
        },
        secondary: {
          DEFAULT: "var(--color-interactive-secondary, rgb(134 134 133))",
          hover: "var(--color-interactive-secondary-hover, rgb(108 108 107))",
          active: "var(--color-interactive-secondary-active, rgb(82 82 81))",
        },
        control: {
          DEFAULT: "var(--color-interactive-control, rgb(22 51 0))",
          hover: "var(--color-interactive-control-hover, rgb(13 31 0))",
          active: "var(--color-interactive-control-active, rgb(14 15 12))",
        },
      },
      background: {
        screen: {
          DEFAULT: "var(--color-background-screen, rgb(255 255 255))",
          hover: "var(--color-background-screen-hover, rgb(22 51 0 / 0.08))",
          active: "var(--color-background-screen-active, rgb(22 51 0 / 0.13))",
        },
        elevated: "var(--color-background-elevated, rgb(255 255 255))",
        neutral: {
          DEFAULT: "var(--color-background-neutral, rgb(22 51 0 / 0.08))",
          hover: "var(--color-background-neutral-hover, rgb(22 51 0 / 0.13))",
          active: "var(--color-background-neutral-active, rgb(22 51 0 / 0.18))",
        },
        overlay: "var(--color-background-overlay, rgb(22 51 0 / 0.08))",
      },
      border: {
        neutral: "var(--color-border-neutral, rgb(14 15 12 / 0.12))",
        overlay: "var(--color-border-overlay, rgb(14 15 12 / 0.12))",
      },
      sentiment: {
        negative: {
          DEFAULT: "var(--color-sentiment-negative, rgb(168 32 13))",
          hover: "var(--color-sentiment-negative-hover, rgb(142 27 11))",
          active: "var(--color-sentiment-negative-active, rgb(118 23 9))",
        },
        positive: "var(--color-sentiment-positive, rgb(47 87 17))",
        warning: "var(--color-sentiment-warning, rgb(237 200 67))",
      },
      contrast: {
        theme: "var(--color-contrast-theme, rgb(18 21 17))",
        overlay: "var(--color-contrast-overlay, rgb(255 255 255))",
      },
      base: {
        light: "var(--color-base-light, rgb(255 255 255))",
        dark: "var(--color-base-dark, rgb(18 21 17))",
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
  plugins: [containerQueriesPlugin],
} satisfies Config;
