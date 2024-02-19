interface Theme {
  "color-scheme": "light" | "dark";
  "--color-content-primary": string;
  "--color-content-secondary": string;
  "--color-content-tertiary": string;
  "--color-content-link": string;
  "--color-content-link-hover": string;
  "--color-content-link-active": string;
  "--color-interactive-primary": string;
  "--color-interactive-primary-hover": string;
  "--color-interactive-primary-active": string;
  "--color-interactive-accent": string;
  "--color-interactive-accent-hover": string;
  "--color-interactive-accent-active": string;
  "--color-interactive-secondary": string;
  "--color-interactive-secondary-hover": string;
  "--color-interactive-secondary-active": string;
  "--color-interactive-control": string;
  "--color-interactive-control-hover": string;
  "--color-interactive-control-active": string;
  "--color-background-screen": string;
  "--color-background-screen-hover": string;
  "--color-background-screen-active": string;
  "--color-background-elevated": string;
  "--color-background-neutral": string;
  "--color-background-neutral-hover": string;
  "--color-background-neutral-active": string;
  "--color-background-overlay": string;
  "--color-border-neutral": string;
  "--color-border-overlay": string;
  "--color-sentiment-negative": string;
  "--color-sentiment-negative-hover": string;
  "--color-sentiment-negative-active": string;
  "--color-sentiment-positive": string;
  "--color-sentiment-warning": string;
  "--color-contrast-theme": string; // TODO: Remove
  "--color-contrast-overlay": string;
  "--color-base-light": string;
  "--color-base-dark": string;
}

export const lightTheme = {
  "color-scheme": "light",
  "--color-content-primary": "rgb(14 15 12)",
  "--color-content-secondary": "rgb(69 71 69)",
  "--color-content-tertiary": "rgb(106 108 106)",
  "--color-content-link": "rgb(22 51 0)",
  "--color-content-link-hover": "rgb(13 31 0)",
  "--color-content-link-active": "rgb(14 15 12)",
  "--color-interactive-primary": "rgb(22 51 0)",
  "--color-interactive-primary-hover": "rgb(13 31 0)",
  "--color-interactive-primary-active": "rgb(14 15 12)",
  "--color-interactive-accent": "rgb(159 232 112)",
  "--color-interactive-accent-hover": "rgb(128 225 66)",
  "--color-interactive-accent-active": "rgb(101 207 33)",
  "--color-interactive-secondary": "rgb(134 134 133)",
  "--color-interactive-secondary-hover": "rgb(108 108 107)",
  "--color-interactive-secondary-active": "rgb(82 82 81)",
  "--color-interactive-control": "rgb(22 51 0)",
  "--color-interactive-control-hover": "rgb(13 31 0)",
  "--color-interactive-control-active": "rgb(14 15 12)",
  "--color-background-screen": "rgb(255 255 255)",
  "--color-background-screen-hover": "rgb(22 51 0 / 0.08)",
  "--color-background-screen-active": "rgb(22 51 0 / 0.13)",
  "--color-background-elevated": "rgb(255 255 255)",
  "--color-background-neutral": "rgb(22 51 0 / 0.08)",
  "--color-background-neutral-hover": "rgb(22 51 0 / 0.13)",
  "--color-background-neutral-active": "rgb(22 51 0 / 0.18)",
  "--color-background-overlay": "rgb(22 51 0 / 0.08)",
  "--color-border-neutral": "rgb(14 15 12 / 0.12)",
  "--color-border-overlay": "rgb(14 15 12 / 0.12)",
  "--color-sentiment-negative": "rgb(168 32 13)",
  "--color-sentiment-negative-hover": "rgb(142 27 11)",
  "--color-sentiment-negative-active": "rgb(118 23 9)",
  "--color-sentiment-positive": "rgb(47 87 17)",
  "--color-sentiment-warning": "rgb(237 200 67)",
  "--color-contrast-theme": "rgb(18 21 17)",
  "--color-contrast-overlay": "rgb(255 255 255)",
  "--color-base-light": "rgb(255 255 255)",
  "--color-base-dark": "rgb(18 21 17)",
} as const satisfies Theme;

export const lightGreenTheme = {
  ...lightTheme,
  "--color-content-primary": "rgb(22 51 0)",
  "--color-content-secondary": "rgb(22 51 0)",
  "--color-content-tertiary": "transparent",
  "--color-interactive-accent": "rgb(22 51 0)",
  "--color-interactive-accent-hover": "rgb(13 31 0)",
  "--color-interactive-accent-active": "rgb(14 15 12)",
  "--color-interactive-secondary": "transparent",
  "--color-interactive-secondary-hover": "transparent",
  "--color-interactive-secondary-active": "transparent",
  "--color-interactive-control": "rgb(159 232 112)",
  "--color-interactive-control-hover": "rgb(187 239 154)",
  "--color-interactive-control-active": "rgb(217 246 198)",
  "--color-background-screen": "rgb(159 232 112)",
  "--color-background-screen-hover": "transparent", // TODO: Validate
  "--color-background-screen-active": "rgb(255 255 255 / 0.4)", // TODO: Validate
  "--color-background-elevated": "transparent",
  "--color-background-neutral": "rgb(255 255 255 / 0.3)", // TODO: Validate
  "--color-background-neutral-hover": "transparent", // TODO: Validate
  "--color-background-neutral-active": "transparent", // TODO: Validate
  "--color-background-overlay": "transparent",
  "--color-border-neutral": "transparent",
  "--color-border-overlay": "transparent",
  "--color-sentiment-negative": "transparent",
  "--color-sentiment-negative-hover": "transparent",
  "--color-sentiment-negative-active": "transparent",
  "--color-sentiment-positive": "transparent",
  "--color-sentiment-warning": "transparent",
  "--color-contrast-theme": "rgb(22 51 0)",
  "--color-base-dark": "rgb(22 51 0)",
} as const satisfies Theme;

export const darkTheme = {
  "color-scheme": "dark",
  "--color-content-primary": "rgb(243 245 241)",
  "--color-content-secondary": "rgb(232 235 230)",
  "--color-content-tertiary": "rgb(202 207 199)",
  "--color-content-link": "rgb(159 232 112)",
  "--color-content-link-hover": "rgb(205 255 173)",
  "--color-content-link-active": "rgb(236 255 224)",
  "--color-interactive-primary": "rgb(159 232 112)",
  "--color-interactive-primary-hover": "rgb(205 255 173)",
  "--color-interactive-primary-active": "rgb(236 255 224)",
  "--color-interactive-accent": "rgb(159 232 112)",
  "--color-interactive-accent-hover": "rgb(205 255 173)",
  "--color-interactive-accent-active": "rgb(236 255 224)",
  "--color-interactive-secondary": "rgb(185 186 183)",
  "--color-interactive-secondary-hover": "rgb(236 237 233)",
  "--color-interactive-secondary-active": "rgb(249 250 246)",
  "--color-interactive-control": "rgb(22 51 0)",
  "--color-interactive-control-hover": "rgb(33 77 0)",
  "--color-interactive-control-active": "rgb(44 102 0)",
  "--color-background-screen": "rgb(18 21 17)",
  "--color-background-screen-hover": "rgb(255 255 255 / 0.1)",
  "--color-background-screen-active": "rgb(255 255 255 / 0.2)",
  "--color-background-elevated": "rgb(30 33 29)",
  "--color-background-neutral": "rgb(255 255 255 / 0.1)",
  "--color-background-neutral-hover": "rgb(255 255 255 / 0.2)",
  "--color-background-neutral-active": "rgb(255 255 255 / 0.3)",
  "--color-background-overlay": "rgb(255 255 255 / 0.2)",
  "--color-border-neutral": "rgb(255 255 255 / 0.2)",
  "--color-border-overlay": "rgb(255 255 255 / 0.2)",
  "--color-sentiment-negative": "rgb(255 191 189)",
  "--color-sentiment-negative-hover": "rgb(255 220 219)",
  "--color-sentiment-negative-active": "rgb(255 235 235)",
  "--color-sentiment-positive": "rgb(160 229 174)",
  "--color-sentiment-warning": "rgb(237 210 114)",
  "--color-contrast-theme": "rgb(255 255 255)",
  "--color-contrast-overlay": "rgb(18 21 17)",
  "--color-base-light": "rgb(255 255 255)",
  "--color-base-dark": "rgb(18 21 17)",
} as const satisfies Theme;

export const darkGreenTheme = {
  ...darkTheme,
  "--color-content-primary": "rgb(159 232 112)",
  "--color-content-tertiary": "rgb(208 213 206)",
  "--color-interactive-secondary": "rgb(203 217 195)",
  "--color-interactive-secondary-hover": "rgb(217 227 211)",
  "--color-interactive-secondary-active": "rgb(231 237 227)",
  "--color-background-screen": "rgb(22 51 0)",
  "--color-background-screen-hover": "rgb(255 255 255 / 0.1)",
  "--color-background-screen-active": "rgb(255 255 255 / 0.2)",
  "--color-background-elevated": "rgb(34 61 13)",
  // TODO: Verify `--color-sentiment-negative`
  "--color-contrast-overlay": "rgb(22 51 0)",
  "--color-base-dark": "rgb(22 51 0)",
} as const satisfies Theme;
