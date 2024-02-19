import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { Spinner } from "../Spinner";

export type ButtonPropsBase = Pick<
  React.ComponentPropsWithRef<"button">,
  | "ref"
  | "type"
  | "aria-describedby"
  | "disabled"
  | "className"
  | "style"
  | "onClick"
> & {
  as?: React.ElementType<
    React.ComponentPropsWithoutRef<"button"> &
      Required<
        Pick<
          React.ComponentPropsWithoutRef<"button">,
          "type" | "disabled" | "className" | "children"
        >
      >
  >;
  loading?: boolean;
  children: React.ReactNode;
};

export type ButtonProps = Merge<
  React.ComponentPropsWithRef<"button">,
  ButtonPropsBase & {
    size?: "auto" | "sm" | "md" | "lg";
    equilateral?: boolean;
  }
>;

export const Button = React.forwardRef(function Button(
  {
    as: Element = "button",
    type = "button",
    size = "auto",
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
    <Element
      ref={Element === "button" ? ref : undefined}
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "transition focus:outline-none focus-visible:ring",
        size !== "auto" && "inline-flex items-center justify-center",
        {
          [clsx("h-8 text-sm tracking-2.5", equilateral && "w-8")]:
            size === "sm",
          [clsx("h-12 text-base tracking-1", equilateral && "w-12")]:
            size === "md",
          [clsx("h-14 text-base tracking-1", equilateral && "w-14")]:
            size === "lg",
        },
        loading ? "cursor-wait gap-x-2" : disabled && "cursor-not-allowed",
        (disabled || loading) && "opacity-45 mix-blend-luminosity",
        className,
      )}
      {...restProps}
    >
      {children} {loading ? <Spinner /> : null}
    </Element>
  );
});
