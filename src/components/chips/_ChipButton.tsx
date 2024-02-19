import { clsx } from "clsx";
import * as React from "react";

import { parseBooleanish } from "../../parseBooleanish";
import { Button, ButtonProps } from "../buttons/_Button";

export type ChipButtonProps = ButtonProps;

export const ChipButton = React.forwardRef(function ChipButton(
  {
    "aria-checked": ariaCheckedRaw = false,
    "aria-disabled": ariaDisabledRaw,
    disabled = ariaDisabledRaw != null
      ? parseBooleanish(ariaDisabledRaw)
      : false,
    className,
    children,
    ...restProps
  }: ChipButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const ariaChecked =
    ariaCheckedRaw === "mixed" ? false : parseBooleanish(ariaCheckedRaw);
  return (
    <Button
      ref={ref}
      disabled={disabled}
      aria-disabled={!disabled ? ariaDisabledRaw : undefined}
      className={clsx(
        "rounded-full border px-4 font-semibold",
        ariaChecked
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
      )}
      {...restProps}
    >
      <span className="-mx-px">{children}</span>
    </Button>
  );
});
