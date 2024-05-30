import { clsx } from "clsx/lite";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "./_Button";

export interface ActionButtonProps extends Omit<ButtonProps, "size"> {
  icon?: React.ReactNode;
  iconPlacement?: "start" | "end";
  disabled?: boolean;
}

export const ActionButton = forwardRef(function ActionButton(
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
