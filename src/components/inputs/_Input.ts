import { clsx } from "clsx";

interface InputProps {
  size?: "auto" | "sm" | "md" | "xl";
}

export function inputClassNameBase({ size = "auto" }: InputProps = {}) {
  return clsx(
    "px-4 text-content-primary ring-1 ring-inset ring-interactive-secondary transition focus:outline-none focus:!ring-3 focus:!ring-interactive-primary enabled:hover:ring-2 enabled:hover:ring-interactive-secondary-hover disabled:pointer-events-none disabled:opacity-45 disabled:mix-blend-luminosity aria-invalid:ring-2 aria-invalid:!ring-sentiment-negative",
    {
      "h-8 text-sm": size === "sm",
      "h-12 text-base": size === "md",
      "h-18 text-xl": size === "xl",
    },
  );
}
