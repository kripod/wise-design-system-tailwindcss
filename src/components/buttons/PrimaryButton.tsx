import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { Button, ButtonProps } from "./_Button";

export type PrimaryButtonProps = Merge<
  Omit<
    ButtonProps,
    "equilateral" | "aria-label" | "aria-labelledby" | "aria-pressed"
  >,
  {
    size?: "sm" | "md";
    sentiment?: "neutral" | "negative";
  }
>;

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
          "bg-sentiment-negative text-base-contrast ring-sentiment-negative-active":
            sentiment === "negative",
        },
        !disabled &&
          !loading && {
            "hover:bg-interactive-accent-hover active:bg-interactive-accent-active":
              sentiment === "neutral",
            "hover:bg-sentiment-negative-hover active:bg-sentiment-negative-active":
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
