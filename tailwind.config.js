const containerQueriesPlugin = require("@tailwindcss/container-queries");
const { transparentize } = require("color2k");
const defaultTheme = require("tailwindcss/defaultTheme");
const innerBorderPlugin = require("tailwindcss-inner-border");

/**
 * @param {number} value
 * @param {number} fractionDigits
 * @returns {number}
 */
function roundTo(value, fractionDigits) {
  return Number(
    `${Math.round(Number(`${value}e+${fractionDigits}`))}e-${fractionDigits}`,
  );
}

/**
 * @param {number} value
 * @returns {string}
 */
function pxToRem(value) {
  return `${roundTo(value / 16, 4)}rem`;
}

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mjs,ts,tsx,mts}"],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true,
  },
  darkMode: "class",
  theme: {
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
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      content: {
        primary: "#0e0f0c",
        secondary: "#454745",
        tertiary: "#6a6c6a",
        link: {
          DEFAULT: "#163300",
          hover: "#0d1f00",
          active: "#0e0f0c",
        },
      },
      interactive: {
        primary: {
          DEFAULT: "#163300",
          hover: "#0d1f00",
          active: "#0e0f0c",
        },
        accent: {
          DEFAULT: "#9fe870",
          hover: "#80e142",
          active: "#65cf21",
        },
        secondary: {
          DEFAULT: "#868685",
          hover: "#6c6c6b",
          active: "#525251",
        },
        control: {
          DEFAULT: "#163300",
          hover: "#0d1f00",
          active: "#0e0f0c",
        },
      },
      background: {
        screen: {
          DEFAULT: "#ffffff",
          hover: transparentize("#163300", 1 - 0.08),
          active: transparentize("#163300", 1 - 0.13),
        },
        elevated: "#ffffff",
        neutral: {
          DEFAULT: transparentize("#163300", 1 - 0.08),
          hover: transparentize("#163300", 1 - 0.13),
          active: transparentize("#163300", 1 - 0.18),
        },
        overlay: transparentize("#163300", 1 - 0.08),
      },
      border: {
        neutral: transparentize("#0e0f0c", 1 - 0.12),
        overlay: transparentize("#0e0f0c", 1 - 0.12),
      },
      sentiment: {
        negative: {
          DEFAULT: "#a8200d",
          hover: "#8e1b0b",
          active: "#761709",
        },
        positive: "#2f5711",
        warning: "#edc843",
      },
      base: {
        contrast: "#ffffff",
      },
    }),
    spacing: {
      px: "1px",
      0: "0px",
      // 1: pxToRem(4),
      2: pxToRem(8), // TODO: Remove if needed
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
    borderRadius: {
      none: "0px",
      DEFAULT: pxToRem(10),
      lg: pxToRem(16),
      xl: pxToRem(24),
      full: "9999px",
    },
    boxShadow: {
      xl: "0 0 40px rgb(69 71 69 / 0.2)", // TODO: Change color
      none: "none",
    },
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
    textUnderlineOffset: {
      auto: "auto",
      3: "3px",
    },
    extend: {
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.border.neutral"),
      }),
      ringColor: ({ theme }) => ({
        DEFAULT: theme("colors.interactive.primary.DEFAULT"),
      }),
      ringOffsetColor: ({ theme }) => ({
        DEFAULT: theme("colors.background.screen.DEFAULT"),
      }),
      ringOffsetWidth: {
        DEFAULT: defaultTheme.ringOffsetWidth[2],
      },
      ringWidth: {
        DEFAULT: defaultTheme.ringWidth[2],
      },
      transitionTimingFunction: {
        DEFAULT: defaultTheme.transitionTimingFunction.out,
      },
    },
  },
  plugins: [containerQueriesPlugin, innerBorderPlugin],
};
