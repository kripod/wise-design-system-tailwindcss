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
    className,
    ...restProps
  }: SecondaryButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      className={clsx(
        "rounded-full px-4 ring-1 ring-inset ring-current",
        {
          "text-interactive-primary hover:bg-interactive-accent-hover hover:text-interactive-control hover:ring-interactive-accent-hover active:bg-interactive-accent-active active:text-interactive-control active:ring-interactive-accent-active":
            sentiment === "neutral",
          "text-sentiment-negative hover:bg-sentiment-negative-hover hover:text-contrast-overlay hover:ring-sentiment-negative-hover focus-visible:outline-sentiment-negative active:bg-sentiment-negative-active active:text-contrast-overlay active:ring-sentiment-negative-active":
            sentiment === "negative",
        },
        className,
      )}
      {...restProps}
    />
  );
});
