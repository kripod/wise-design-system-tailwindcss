import { clsx } from "clsx";
import * as React from "react";

import { Button, ButtonProps } from "./_Button";

export type ActionButtonProps = Omit<
  ButtonProps,
  | "size"
  | "equilateral"
  | "loading"
  | "aria-disabled"
  | "aria-label"
  | "aria-labelledby"
  | "aria-pressed"
>;

export const ActionButton = React.forwardRef(function ActionButton(
  { disabled = false, className, children, ...restProps }: ActionButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size="sm"
      disabled={disabled}
      className={clsx(
        "gap-x-2 rounded-full bg-interactive-accent px-3 font-semibold text-interactive-control",
        !disabled &&
          "hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
