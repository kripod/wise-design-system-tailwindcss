const { transparentize } = require("color2k");
const defaultTheme = require("tailwindcss/defaultTheme");

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
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionTimingFunction: {
        DEFAULT: defaultTheme.transitionTimingFunction.out,
      },
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
        tertiary: "#ffffff",
        control: "#163300",
      },
      background: {
        screen: {
          DEFAULT: "#ffffff",
          hover: transparentize("#163300", 1 - 0.08),
          active: transparentize("#163300", 1 - 0.18),
        },
        elevated: "#ffffff",
        neutral: {
          DEFAULT: transparentize("#163300", 1 - 0.08),
          hover: transparentize("#163300", 1 - 0.18),
          active: transparentize("#163300", 1 - 0.28),
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
          hover: "#761709",
          active: "#470e05",
        },
        positive: "#2f5711",
        warning: "#edc843",
      },
    }),
    spacing: {
      px: "1px",
      1: pxToRem(4),
      2: pxToRem(8),
      2.5: pxToRem(10),
      3: pxToRem(12),
      4: pxToRem(16),
      6: pxToRem(24),
      8: pxToRem(32),
      10: pxToRem(40),
      12: pxToRem(48),
      14: pxToRem(56),
      16: pxToRem(64),
      18: pxToRem(72),
      20: pxToRem(80),
      22: pxToRem(88),
      24: pxToRem(96),
      26: pxToRem(104),
      28: pxToRem(112),
      30: pxToRem(120),
      32: pxToRem(128),
    },
    borderRadius: {
      none: "0px",
      DEFAULT: pxToRem(10),
      lg: pxToRem(16),
      xl: pxToRem(24),
      full: "9999px",
    },
    fontFamily: {
      sans: ['"Inter"', "ui-sans-serif", "system-ui"],
    },
    fontSize: {
      xs: [pxToRem(12), { lineHeight: pxToRem(18), letterSpacing: "0.02em" }],
      sm: [pxToRem(14), { lineHeight: pxToRem(22), letterSpacing: "0.01em" }],
      base: [
        pxToRem(16),
        { lineHeight: pxToRem(24), letterSpacing: "-0.005em" },
      ],
      lg: [pxToRem(18), { lineHeight: pxToRem(24), letterSpacing: "-0.01em" }],
      xl: [pxToRem(22), { lineHeight: pxToRem(28), letterSpacing: "-0.015em" }],
      "2xl": [
        pxToRem(26),
        { lineHeight: pxToRem(32), letterSpacing: "-0.015em" },
      ],
      "3xl": [
        pxToRem(30),
        { lineHeight: pxToRem(34), letterSpacing: "-0.025em" },
      ],
      "5xl": [pxToRem(40), { lineHeight: "0.85" }],
      "6xl": [pxToRem(64), { lineHeight: "0.85" }],
      "8xl": [pxToRem(96), { lineHeight: "0.85" }],
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      extrabold: "800",
      black: "900",
    },
    letterSpacing: {
      0: "0em",
      1: "0.005em",
      2: "0.01em",
      3: "0.015em",
      4: "0.02em",
      5: "0.025em",
    },
    lineHeight: {
      tight: "0.85",
      none: "1",
      normal: "1.5",
      4.5: pxToRem(18),
      5.5: pxToRem(22),
      6: pxToRem(24),
      7: pxToRem(28),
      8: pxToRem(32),
      8.5: pxToRem(34),
    },
  },
  corePlugins: {
    animation: false,
  },
};
