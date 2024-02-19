import { clsx } from "clsx";
import * as React from "react";

import { Button, ButtonPropsBase } from "./_Button";

export type TertiaryButtonProps = ButtonPropsBase & {
  size?: "sm" | "md";
};

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
        "rounded-full px-4 font-semibold text-interactive-primary underline underline-offset-3 enabled:hover:text-interactive-primary-hover enabled:active:bg-background-screen-active enabled:active:text-interactive-primary-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
