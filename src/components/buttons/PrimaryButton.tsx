import { clsx } from "clsx";
import * as React from "react";

export type PrimaryButtonOwnProps = {
  size?: "sm" | "md";
  sentiment?: "neutral" | "negative";
};

export type PrimaryButtonProps = React.ComponentPropsWithRef<"button"> &
  PrimaryButtonOwnProps;

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
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={clsx(
        "rounded-full px-4 font-semibold transition focus:outline-none focus-visible:ring",
        {
          "bg-interactive-accent text-interactive-control":
            sentiment === "neutral",
          "bg-sentiment-negative text-base-contrast ring-sentiment-negative-active":
            sentiment === "negative",
        },
        !disabled
          ? {
              "hover:bg-interactive-accent-hover active:bg-interactive-accent-active":
                sentiment === "neutral",
              "hover:bg-sentiment-negative-hover active:bg-sentiment-negative-active":
                sentiment === "negative",
            }
          : "cursor-not-allowed opacity-45 mix-blend-luminosity",
        {
          "h-8 text-sm tracking-2.5": size === "sm",
          "h-12 text-base tracking-1": size === "md",
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
});
