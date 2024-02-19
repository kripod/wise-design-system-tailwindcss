import clsx from "clsx";
import * as React from "react";

export type ActionButtonProps = React.ComponentPropsWithRef<"button">;

export const ActionButton = React.forwardRef(function ActionButton({
  className,
  children,
  ...restProps
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "h-8 rounded-full bg-interactive-accent px-3 text-sm font-semibold text-interactive-primary transition-colors hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
});
