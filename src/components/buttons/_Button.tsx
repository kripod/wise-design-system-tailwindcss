import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

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

export type ButtonProps = Merge<
  Pick<
    React.ComponentPropsWithRef<"button">,
    "ref" | "type" | "disabled" | "className" | "style" | "onClick"
  > &
    ButtonAriaAttributes,
  {
    size?: "auto" | "sm" | "md" | "lg";
    equilateral?: boolean;
    loading?: boolean;
    children: React.ReactNode;
  }
>;

export const Button = React.forwardRef(function Button(
  {
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
