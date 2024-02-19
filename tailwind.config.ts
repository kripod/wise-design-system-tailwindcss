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
        primary: "rgb(var(--color-content-primary, 14 15 12))",
        secondary: "rgb(var(--color-content-secondary, 69 71 69))",
        tertiary: "rgb(var(--color-content-tertiary, 106 108 106))",
        link: {
          DEFAULT: "rgb(var(--color-content-link, 22 51 0))",
          hover: "rgb(var(--color-content-link-hover, 13 31 0))",
          active: "rgb(var(--color-content-link-active, 14 15 12))",
        },
      },
      interactive: {
        primary: {
          DEFAULT: "rgb(var(--color-interactive-primary, 22 51 0))",
          hover: "rgb(var(--color-interactive-primary-hover, 13 31 0))",
          active: "rgb(var(--color-interactive-primary-active, 14 15 12))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-interactive-accent, 159 232 112))",
          hover: "rgb(var(--color-interactive-accent-hover, 128 225 66))",
          active: "rgb(var(--color-interactive-accent-active, 101 207 33))",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-interactive-secondary, 134 134 133))",
          hover: "rgb(var(--color-interactive-secondary-hover, 108 108 107))",
          active: "rgb(var(--color-interactive-secondary-active, 82 82 81))",
        },
        control: {
          DEFAULT: "rgb(var(--color-interactive-control, 22 51 0))",
          hover: "rgb(var(--color-interactive-control-hover, 13 31 0))",
          active: "rgb(var(--color-interactive-control-active, 14 15 12))",
        },
      },
      background: {
        screen: {
          DEFAULT: "rgb(var(--color-background-screen, 255 255 255))",
          hover: "rgb(var(--color-background-screen-hover, 22 51 0) / 0.08)",
          active: "rgb(var(--color-background-screen-active, 22 51 0) / 0.13)",
        },
        elevated: "rgb(var(--color-background-elevated, 255 255 255))",
        neutral: {
          DEFAULT: "rgb(var(--color-background-neutral, 22 51 0) / 0.08)",
          hover: "rgb(var(--color-background-neutral-hover, 22 51 0) / 0.13)",
          active: "rgb(var(--color-background-neutral-active, 22 51 0) / 0.18)",
        },
        overlay: "rgb(var(--color-background-overlay, 22 51 0) / 0.08)",
      },
      border: {
        neutral: "rgb(var(--color-border-neutral, 14 15 12) / 0.12)",
        overlay: "rgb(var(--color-border-overlay, 14 15 12) / 0.12)",
      },
      sentiment: {
        negative: {
          DEFAULT: "rgb(var(--color-sentiment-negative, 168 32 13))",
          hover: "rgb(var(--color-sentiment-negative-hover, 142 27 11))",
          active: "rgb(var(--color-sentiment-negative-active, 118 23 9))",
        },
        positive: "rgb(var(--color-sentiment-positive, 47 87 17))",
        warning: "rgb(var(--color-sentiment-warning, 237 200 67))",
      },
      base: {
        contrast: "rgb(var(--color-base-contrast, 255 255 255))",
        light: "rgb(var(--color-base-light, 255 255 255))",
        dark: "rgb(var(--color-base-dark, 18 21 17))",
      },
    }),
    fontFamily: {
      sans: ['"InterVariable"', '"Inter"', "ui-sans-serif", "system-ui"],
    },
    fontSize: {
      xs: [
        pxToRem(12),
        {
          lineHeight: pxToRem(18),
          letterSpacing: "0.02em",
          fontWeight: "500",
        },
      ],
      sm: [
        pxToRem(14),
        {
          lineHeight: pxToRem(22),
          letterSpacing: "0.01em",
        },
      ],
      base: [
        pxToRem(16),
        {
          lineHeight: pxToRem(24),
          letterSpacing: "-0.005em",
        },
      ],
      lg: [
        pxToRem(18),
        {
          lineHeight: pxToRem(24),
          letterSpacing: "-0.01em",
          fontWeight: "600",
        },
      ],
      xl: [
        pxToRem(22),
        {
          lineHeight: pxToRem(28),
          letterSpacing: "-0.015em",
          fontWeight: "600",
        },
      ],
      "2xl": [
        pxToRem(26),
        {
          lineHeight: pxToRem(32),
          letterSpacing: "-0.015em",
          fontWeight: "600",
        },
      ],
      "3xl": [
        pxToRem(30),
        {
          lineHeight: pxToRem(34),
          letterSpacing: "-0.025em",
          fontWeight: "600",
        },
      ],
      "5xl": [
        pxToRem(40),
        {
          lineHeight: "0.85",
          fontWeight: "900",
        },
      ],
      "6xl": [
        pxToRem(64),
        {
          lineHeight: "0.85",
          fontWeight: "900",
        },
      ],
      "8xl": [
        pxToRem(96),
        {
          lineHeight: "0.85",
          fontWeight: "900",
        },
      ],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "900",
    },
    letterSpacing: {
      0: "0em",
      1: "0.005em",
      2: "0.01em",
      2.5: "0.0125em",
      3: "0.015em",
      4: "0.02em",
      5: "0.025em",
      6: "0.03em",
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
  plugins: [containerQueriesPlugin],
} satisfies Config;
