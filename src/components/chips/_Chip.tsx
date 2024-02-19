import { clsx } from "clsx";
import * as React from "react";

import { parseBooleanish } from "../../parseBooleanish";
import { Button } from "../buttons/_Button";

/* TODO: Consider having a single unified `ChipGroup` with a "listbox" role */

export type ChipProps = React.ComponentPropsWithRef<"button">;

export const Chip = React.forwardRef(function Chip(
  {
    "aria-checked": ariaChecked = false,
    "aria-disabled": ariaDisabled,
    disabled = ariaDisabled != null ? parseBooleanish(ariaDisabled) : false,
    className,
    children,
    ...restProps
  }: ChipProps,
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
        "rounded-full px-4 ring-1 ring-inset",
        checked
          ? "bg-interactive-accent text-interactive-control ring-interactive-accent enabled:hover:bg-interactive-accent-hover enabled:hover:ring-interactive-accent-hover enabled:active:bg-interactive-accent-active enabled:active:ring-interactive-accent-active"
          : "text-interactive-primary ring-interactive-secondary enabled:hover:bg-background-screen-hover enabled:hover:text-interactive-primary-hover enabled:hover:ring-interactive-secondary-hover enabled:active:bg-background-screen-active enabled:active:text-interactive-primary-active enabled:active:ring-interactive-secondary-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
