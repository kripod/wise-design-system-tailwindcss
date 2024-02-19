import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export type SecondaryButtonProps = ButtonPropsBase & {
  size?: "sm" | "md";
  sentiment?: "neutral" | "negative";
};

export const SecondaryButton = React.forwardRef(function SecondaryButton(
  {
    size = "md",
    sentiment = "neutral",
    loading = false,
    disabled = false,
    className,
    children,
    ...restProps
  }: SecondaryButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      loading={loading}
      disabled={disabled}
      className={clsx(
        "rounded-full px-4 font-semibold ring-1 ring-inset ring-current",
        {
          "text-interactive-primary": sentiment === "neutral",
          "text-sentiment-negative focus-visible:outline-sentiment-negative":
            sentiment === "negative",
        },
        {
          "enabled:hover:bg-interactive-accent-hover enabled:hover:text-interactive-control enabled:hover:ring-interactive-accent-hover enabled:active:bg-interactive-accent-active enabled:active:text-interactive-control enabled:active:ring-interactive-accent-active":
            sentiment === "neutral",
          "enabled:hover:bg-sentiment-negative-hover enabled:hover:text-contrast-overlay enabled:hover:ring-sentiment-negative-hover enabled:active:bg-sentiment-negative-active enabled:active:text-contrast-overlay enabled:active:ring-sentiment-negative-active":
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
