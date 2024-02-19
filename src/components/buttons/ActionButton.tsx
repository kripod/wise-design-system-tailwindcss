import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export type ActionButtonProps = Omit<ButtonPropsBase, "loading">;

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
        "inline-flex items-center justify-center gap-x-2 rounded-full bg-interactive-accent px-3 text-interactive-control hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
