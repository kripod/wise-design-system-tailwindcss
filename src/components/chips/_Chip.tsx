import { clsx } from "clsx/lite";
import { forwardRef } from "react";

import { parseBooleanish } from "../../utils/parseBooleanish";
import { Button } from "../buttons/_Button";

/* TODO: Consider having a single unified `ChipGroup` with a "listbox" role */

export interface ChipProps extends React.ComponentPropsWithRef<"button"> {}

export const Chip = forwardRef(function Chip(
  {
    "aria-checked": ariaChecked = false,
    "aria-disabled": ariaDisabled,
    disabled = ariaDisabled != null ? parseBooleanish(ariaDisabled) : false,
    className,
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
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      className={clsx(
        className,
        "rounded-full px-4 ring-1 ring-inset",
        checked
          ? "bg-interactive-accent text-interactive-control ring-interactive-accent hover:bg-interactive-accent-hover hover:ring-interactive-accent-hover active:bg-interactive-accent-active active:ring-interactive-accent-active"
          : "text-interactive-primary ring-interactive-secondary hover:bg-background-screen-hover hover:text-interactive-primary-hover hover:ring-interactive-secondary-hover active:bg-background-screen-active active:text-interactive-primary-active active:ring-interactive-secondary-active",
      )}
      {...restProps}
    />
  );
});
