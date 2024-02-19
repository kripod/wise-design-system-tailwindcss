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
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
