import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { Button, ButtonProps } from "./_Button";

export type TertiaryButtonProps = Merge<
  Omit<
    ButtonProps,
    | "equilateral"
    | "aria-disabled"
    | "aria-label"
    | "aria-labelledby"
    | "aria-pressed"
  >,
  {
    size?: "sm" | "md";
  }
>;

export const TertiaryButton = React.forwardRef(function TertiaryButton(
  {
    size = "md",
    loading = false,
    disabled = false,
    className,
    children,
    ...restProps
  }: TertiaryButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      loading={loading}
      disabled={disabled}
      className={clsx(
        "rounded-full px-4 font-semibold text-interactive-primary underline underline-offset-3",
        !disabled &&
          !loading &&
          "hover:text-interactive-primary-hover active:bg-background-screen-active active:text-interactive-primary-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
