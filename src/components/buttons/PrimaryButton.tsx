import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export type PrimaryButtonProps = ButtonPropsBase & {
  size?: "sm" | "md";
  sentiment?: "neutral" | "negative";
};

export const PrimaryButton = React.forwardRef(function PrimaryButton(
  {
    size = "md",
    sentiment = "neutral",
    loading = false,
    disabled = false,
    className,
    children,
    ...restProps
  }: PrimaryButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      loading={loading}
      disabled={disabled}
      className={clsx(
        "rounded-full px-4 font-semibold",
        {
          "bg-interactive-accent text-interactive-control":
            sentiment === "neutral",
          "bg-sentiment-negative text-contrast-overlay focus-visible:outline-sentiment-negative":
            sentiment === "negative",
        },
        {
          "enabled:hover:bg-interactive-accent-hover enabled:active:bg-interactive-accent-active":
            sentiment === "neutral",
          "enabled:hover:bg-sentiment-negative-hover enabled:active:bg-sentiment-negative-active":
            sentiment === "negative",
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
