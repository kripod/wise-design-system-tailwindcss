import { clsx } from "clsx/lite";
import { forwardRef } from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export interface ButtonSecondaryProps extends ButtonPropsBase {
  size?: "sm" | "md";
  sentiment?: "neutral" | "negative";
}

export const ButtonSecondary = forwardRef(function ButtonSecondary(
  {
    size = "md",
    sentiment = "neutral",
    className,
    ...restProps
  }: ButtonSecondaryProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      className={clsx(
        className,
        "rounded-full px-4 ring-1 ring-inset ring-current",
        sentiment === "neutral" &&
          "text-interactive-primary hover:bg-interactive-accent-hover hover:text-interactive-control hover:ring-interactive-accent-hover active:bg-interactive-accent-active active:text-interactive-control active:ring-interactive-accent-active",
        sentiment === "negative" &&
          "text-sentiment-negative hover:bg-sentiment-negative-hover hover:text-contrast-overlay hover:ring-sentiment-negative-hover focus-visible:outline-sentiment-negative active:bg-sentiment-negative-active active:text-contrast-overlay active:ring-sentiment-negative-active",
      )}
      {...restProps}
    />
  );
});
