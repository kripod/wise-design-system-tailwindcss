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
  loading?: boolean;
  render?: (
    props: React.ComponentPropsWithoutRef<"button"> &
      Required<
        Pick<
          React.ComponentPropsWithoutRef<"button">,
          "disabled" | "className" | "children"
        >
      >,
  ) => React.ReactNode;
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
    size = "auto",
    equilateral = false,
    loading = false,
    disabled = false,
    className,
    render,
    children,
    ...restProps
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <>
      {(render ?? ((props) => <button ref={ref} type="button" {...props} />))({
        disabled: disabled || loading,
        className: clsx(
          "inline-flex items-center justify-center transition focus:outline-none focus-visible:ring",
          {
            [clsx("h-8 text-sm tracking-2.5", equilateral && "w-8")]:
              size === "sm",
            [clsx("h-12 text-base tracking-1", equilateral && "w-12")]:
              size === "md",
            [clsx("h-14 text-base tracking-1", equilateral && "w-14")]:
              size === "lg",
          },
          loading && "gap-x-2",
          (disabled || loading) && "opacity-45 mix-blend-luminosity",
          disabled ? "cursor-not-allowed" : loading && "cursor-wait",
          className,
        ),
        children: (
          <>
            {children} {loading ? <Spinner /> : null}
          </>
        ),
        ...restProps,
      })}
    </>
  );
});
