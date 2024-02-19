import { clsx } from "clsx";
import * as React from "react";

import { Button, ButtonOwnProps } from "./_Button";

export type PrimaryButtonOwnProps = Pick<ButtonOwnProps, "size" | "loading"> & {
  sentiment?: "neutral" | "negative";
};

export type PrimaryButtonProps = React.ComponentPropsWithRef<"button"> &
  PrimaryButtonOwnProps;

export const PrimaryButton = React.forwardRef(function PrimaryButton(
  {
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
      loading={loading}
      disabled={disabled}
      className={clsx(
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
