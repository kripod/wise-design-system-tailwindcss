import { clsx } from "clsx";
import * as React from "react";

import { Spinner } from "../Spinner";

export type ButtonOwnProps = {
  size?: "sm" | "md";
  equilateral?: boolean;
  loading?: boolean;
};

export type ButtonProps = React.ComponentPropsWithRef<"button"> &
  ButtonOwnProps;

export const Button = React.forwardRef(function Button(
  {
    size = "md",
    equilateral = false,
    loading = false,
    disabled = false,
    className,
    children,
    ...restProps
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-semibold transition focus:outline-none focus-visible:ring",
        {
          [clsx("h-8 text-sm tracking-2.5", equilateral && "w-8")]:
            size === "sm",
          [clsx("h-12 text-base tracking-1", equilateral && "w-12")]:
            size === "md",
        },
        !equilateral && "gap-x-2 px-4",
        (disabled || loading) && "opacity-45 mix-blend-luminosity",
        disabled ? "cursor-not-allowed" : loading && "cursor-wait",
        className,
      )}
      {...restProps}
    >
      {children}
      {loading ? <Spinner /> : null}
    </button>
  );
});
