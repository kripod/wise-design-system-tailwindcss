import { clsx } from "clsx";
import * as React from "react";

import { parseBooleanish } from "../../parseBooleanish";
import { Button, ButtonProps } from "../buttons/_Button";

export type ChipButtonProps = ButtonProps;

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
      aria-checked={ariaChecked}
      aria-disabled={!disabled ? ariaDisabled : undefined}
      disabled={disabled}
      className={clsx(
        "rounded-full border px-4 font-semibold",
        checked
          ? [
              "border-transparent bg-interactive-accent text-interactive-control",
              !disabled &&
                "hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
            ]
          : [
              "border-interactive-secondary text-interactive-primary",
              !disabled &&
                "hover:border-interactive-secondary-hover hover:bg-background-screen-hover hover:text-interactive-primary-hover active:border-interactive-secondary-active active:bg-background-screen-active active:text-interactive-primary-active",
            ],
        className,
      )}
      {...restProps}
    >
      <span className="-mx-px">{children}</span>
    </Button>
  );
});
