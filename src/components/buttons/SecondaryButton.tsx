import { clsx } from "clsx";
import * as React from "react";

import { Button, ButtonPropsBase } from "./_Button";

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
        "rounded-full px-4 font-semibold inner-border inner-border-current",
        {
          "text-interactive-primary": sentiment === "neutral",
          "text-sentiment-negative focus-visible:outline-sentiment-negative":
            sentiment === "negative",
        },
        !disabled &&
          !loading && [
            "hover:inner-border-transparent active:inner-border-transparent",
            {
              "hover:bg-interactive-accent-hover hover:text-interactive-control active:bg-interactive-accent-active active:text-interactive-control":
                sentiment === "neutral",
              "hover:bg-sentiment-negative-hover hover:text-base-contrast active:bg-sentiment-negative-active active:text-base-contrast":
                sentiment === "negative",
            },
          ],
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
