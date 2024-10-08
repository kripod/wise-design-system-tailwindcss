export const minWidthByScreenSize = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
} satisfies Record<string, `${string}px`>;

export type ScreenSize = keyof typeof minWidthByScreenSize;
