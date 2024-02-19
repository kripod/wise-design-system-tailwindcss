import clsx from "clsx";
import * as React from "react";

export type ActionButtonProps = React.ComponentPropsWithRef<"button">;

export const ActionButton = React.forwardRef(function ActionButton(
  { className, children, ...restProps }: ActionButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "h-8 rounded-full bg-interactive-accent px-3 text-sm font-semibold text-interactive-primary transition hover:bg-interactive-accent-hover focus:outline-none focus-visible:ring active:bg-interactive-accent-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
});
