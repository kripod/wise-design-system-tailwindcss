import { clsx } from "clsx";
import * as React from "react";

import { Spinner } from "../Spinner";

type ButtonAriaAttributes = Pick<
  React.AriaAttributes,
  | "aria-controls"
  | "aria-describedby"
  | "aria-details"
  | "aria-expanded"
  | "aria-haspopup"
  | "aria-keyshortcuts"
  | "aria-label"
  | "aria-labelledby"
  | "aria-pressed"
>;

export type ButtonInheritedProps = Pick<
  React.ComponentPropsWithRef<"button">,
  "ref" | "type" | "className" | "style" | "onClick"
> &
  ButtonAriaAttributes;

export type ButtonOwnProps = {
  size?: "sm" | "md" | "lg";
  equilateral?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export type ButtonProps = ButtonInheritedProps & ButtonOwnProps;

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
          [clsx("h-14 text-base tracking-1", equilateral && "w-14")]:
            size === "lg",
        },
        !equilateral && "gap-x-2",
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
