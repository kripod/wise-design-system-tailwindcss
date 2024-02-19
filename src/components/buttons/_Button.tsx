import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

export type ButtonPropsBase = Pick<
  React.ComponentPropsWithRef<"button">,
  | "ref"
  | "type"
  | "aria-describedby"
  | "disabled"
  | "className"
  | "children"
  | "onClick"
> & {
  render?: (props: React.ComponentPropsWithoutRef<"button">) => React.ReactNode;
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
    disabled = false,
    className,
    render,
    ...restProps
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <>
      {(render ?? ((props) => <button ref={ref} type="button" {...props} />))({
        disabled,
        className: clsx(
          "transition focus-visible:outline-offset focus-visible:outline disabled:pointer-events-none disabled:opacity-45 disabled:mix-blend-luminosity",
          {
            [clsx("h-8 text-sm font-semibold", equilateral && "w-8")]:
              size === "sm",
            [clsx("h-12 text-base font-semibold", equilateral && "w-12")]:
              size === "md",
            [clsx("h-14 text-base font-semibold", equilateral && "w-14")]:
              size === "lg",
          },
          equilateral && "inline-flex items-center justify-center",
          className,
        ),
        ...restProps,
      })}
    </>
  );
});
