import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export interface ActionButtonProps extends ButtonPropsBase {
  icon?: React.ReactNode;
  iconPlacement?: "start" | "end";
  disabled?: boolean;
}

export const ActionButton = React.forwardRef(function ActionButton(
  {
    icon,
    iconPlacement = "start",
    className,
    children,
    ...restProps
  }: ActionButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size="sm"
      className={clsx(
        className,
        "rounded-full bg-interactive-accent px-3 text-interactive-control hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
      )}
      {...restProps}
    >
      <span
        className={clsx(
          "inline-flex items-center justify-center gap-x-2",
          iconPlacement === "end" && "flex-row-reverse",
        )}
      >
        {icon}
        <span className="flex-1">{children}</span>
      </span>
    </Button>
  );
});
