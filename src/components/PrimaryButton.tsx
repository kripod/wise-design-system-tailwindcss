import { clsx } from "clsx";
import * as React from "react";

export type PrimaryButtonOwnProps = {
  size?: "sm" | "md";
};

export type PrimaryButtonProps = React.ComponentPropsWithRef<"button"> &
  PrimaryButtonOwnProps;

export const PrimaryButton = React.forwardRef(function PrimaryButton(
  {
    size = "md",
    disabled,
    className,
    children,
    ...restProps
  }: PrimaryButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={clsx(
        "rounded-full bg-interactive-accent px-4 font-semibold transition focus:outline-none focus-visible:ring",
        !disabled
          ? "hover:bg-interactive-accent-hover active:bg-interactive-accent-active"
          : "cursor-not-allowed opacity-45 mix-blend-luminosity",
        {
          "h-8 text-sm": size === "sm",
          "h-12 text-base": size === "md",
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
});
