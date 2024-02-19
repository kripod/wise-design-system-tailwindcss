import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { parseBooleanish } from "../../parseBooleanish";
import { Spinner } from "../Spinner";

export type ButtonPropsBase = Merge<
  Pick<
    React.ComponentPropsWithRef<"button">,
    "ref" | "type" | "disabled" | "className" | "style" | "onClick"
  >,
  {
    size?: "auto" | "sm" | "md" | "lg";
    equilateral?: boolean;
    loading?: boolean;
    children: React.ReactNode;
  } & Pick<React.AriaAttributes, "aria-describedby">
>;

export type ButtonProps = Merge<
  React.ComponentPropsWithRef<"button">,
  ButtonPropsBase
>;

export const Button = React.forwardRef(function Button(
  {
    type = "button",
    size = "auto",
    equilateral = false,
    loading = false,
    "aria-disabled": ariaDisabledRaw = false,
    disabled = parseBooleanish(ariaDisabledRaw),
    className,
    children,
    ...restProps
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type={
        // eslint-disable-next-line react/button-has-type
        type
      }
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center transition focus:outline-none focus-visible:ring",
        {
          [clsx("h-8 text-sm tracking-2.5", equilateral && "w-8")]:
            size === "sm",
          [clsx("h-12 text-base tracking-1", equilateral && "w-12")]:
            size === "md",
          [clsx("h-14 text-base tracking-1", equilateral && "w-14")]:
            size === "lg",
        },
        (disabled || loading) && "opacity-45 mix-blend-luminosity",
        disabled ? "cursor-not-allowed" : loading && "cursor-wait",
        className,
      )}
      {...restProps}
    >
      {children} {loading ? <Spinner /> : null}
    </button>
  );
});
