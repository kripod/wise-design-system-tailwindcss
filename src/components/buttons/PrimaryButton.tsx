import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export interface PrimaryButtonProps extends ButtonPropsBase {
  size?: "sm" | "md";
  sentiment?: "neutral" | "negative";
}

export const PrimaryButton = React.forwardRef(function PrimaryButton(
  {
    size = "md",
    sentiment = "neutral",
    className,
    ...restProps
  }: PrimaryButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      className={clsx(className, "rounded-full px-4", {
        "bg-interactive-accent text-interactive-control hover:bg-interactive-accent-hover active:bg-interactive-accent-active":
          sentiment === "neutral",
        "bg-sentiment-negative text-contrast-overlay hover:bg-sentiment-negative-hover focus-visible:outline-sentiment-negative active:bg-sentiment-negative-active":
          sentiment === "negative",
      })}
      {...restProps}
    />
  );
});

export interface CriticalBannerPrimaryButtonProps extends ButtonPropsBase {}

export const CriticalBannerPrimaryButton = React.forwardRef(
  function CriticalBannerPrimaryButton(
    { className, ...restProps }: PrimaryButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    return (
      <Button
        ref={ref}
        size="sm"
        className={clsx(
          className,
          "rounded-full bg-contrast-overlay px-4 text-sentiment-negative hover:bg-sentiment-negative-hover hover:text-contrast-overlay focus-visible:outline-contrast-overlay active:bg-sentiment-negative-active active:text-contrast-overlay",
        )}
        {...restProps}
      />
    );
  },
);
