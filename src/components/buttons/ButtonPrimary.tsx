import { clsx } from "clsx/lite";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "./_Button";

export interface ButtonPrimaryProps extends ButtonProps {
  size?: "sm" | "md";
  sentiment?: "neutral" | "negative";
}

export const ButtonPrimary = forwardRef(function ButtonPrimary(
  {
    size = "md",
    sentiment = "neutral",
    className,
    ...restProps
  }: ButtonPrimaryProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      className={clsx(
        className,
        "rounded-full px-4",
        sentiment === "neutral" &&
          "bg-interactive-accent text-interactive-control hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
        sentiment === "negative" &&
          "bg-sentiment-negative text-contrast-overlay hover:bg-sentiment-negative-hover focus-visible:outline-sentiment-negative active:bg-sentiment-negative-active",
      )}
      {...restProps}
    />
  );
});

export interface CriticalBannerButtonPrimaryProps
  extends Omit<ButtonProps, "size"> {}

export const CriticalBannerButtonPrimary = forwardRef(
  function CriticalBannerButtonPrimary(
    { className, ...restProps }: ButtonPrimaryProps,
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
