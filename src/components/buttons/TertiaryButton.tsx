import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { Button, ButtonProps } from "./_Button";

export type TertiaryButtonProps = Merge<
  Omit<
    ButtonProps,
    "equilateral" | "aria-label" | "aria-labelledby" | "aria-pressed"
  >,
  {
    size?: "sm" | "md";
  }
>;

export const TertiaryButton = React.forwardRef(function TertiaryButton(
  {
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
      loading={loading}
      disabled={disabled}
      className={clsx(
        "px-4 text-interactive-primary underline underline-offset-3",
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
