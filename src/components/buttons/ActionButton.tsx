import { clsx } from "clsx";
import * as React from "react";

import { Button } from "./_Button";

export type ActionButtonProps = React.ComponentPropsWithRef<"button">;

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
        "bg-interactive-accent px-3 text-interactive-control",
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
