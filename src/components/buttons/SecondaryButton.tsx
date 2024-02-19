import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { Button, ButtonProps } from "./_Button";

export type SecondaryButtonProps = Merge<
  Omit<
    ButtonProps,
    "equilateral" | "aria-label" | "aria-labelledby" | "aria-pressed"
  >,
  {
    size?: "sm" | "md";
    sentiment?: "neutral" | "negative";
  }
>;

export const SecondaryButton = React.forwardRef(function SecondaryButton(
  {
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
      loading={loading}
      disabled={disabled}
      className={clsx(
        "border border-current px-4",
        {
          "text-interactive-primary": sentiment === "neutral",
          "text-sentiment-negative ring-sentiment-negative-active":
            sentiment === "negative",
        },
        !disabled &&
          !loading && [
            "hover:border-transparent active:border-transparent",
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
      <span className="-mx-px">{children}</span>
    </Button>
  );
});
