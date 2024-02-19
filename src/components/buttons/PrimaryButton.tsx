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
      disabled={disabled}
      className={clsx(
        "rounded-full px-4",
        {
          "bg-interactive-accent text-interactive-control hover:bg-interactive-accent-hover active:bg-interactive-accent-active":
            sentiment === "neutral",
          "bg-sentiment-negative text-contrast-overlay hover:bg-sentiment-negative-hover focus-visible:outline-sentiment-negative active:bg-sentiment-negative-active":
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
