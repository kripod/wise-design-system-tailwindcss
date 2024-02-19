import { clsx } from "clsx";
import * as React from "react";

import { parseBooleanish } from "../../parseBooleanish";
import { Button } from "../buttons/_Button";

export type ChipButtonProps = React.ComponentPropsWithRef<"button">;

export const ChipButton = React.forwardRef(function ChipButton(
  {
    "aria-checked": ariaChecked = false,
    "aria-disabled": ariaDisabled,
    disabled = ariaDisabled != null ? parseBooleanish(ariaDisabled) : false,
    className,
    children,
    ...restProps
  }: ChipButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const checked =
    ariaChecked !== "mixed" ? parseBooleanish(ariaChecked) : false;
  return (
    <Button
      ref={ref}
      size="sm"
      aria-checked={ariaChecked}
      aria-disabled={!disabled ? ariaDisabled : undefined}
      disabled={disabled}
      className={clsx(
        "rounded-full px-4 font-semibold inner-border",
        checked
          ? [
              "bg-interactive-accent text-interactive-control inner-border-transparent",
              !disabled &&
                "hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
            ]
          : [
              "text-interactive-primary inner-border-interactive-secondary",
              !disabled &&
                "hover:bg-background-screen-hover hover:text-interactive-primary-hover hover:inner-border-interactive-secondary-hover active:bg-background-screen-active active:text-interactive-primary-active active:inner-border-interactive-secondary-active",
            ],
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
