import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export type TertiaryButtonProps = ButtonPropsBase & {
  size?: "sm" | "md";
};

export const TertiaryButton = React.forwardRef(function TertiaryButton(
  {
    size = "md",
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
      disabled={disabled}
      className={clsx(
        "rounded-full px-4 text-interactive-primary underline underline-offset-3 hover:text-interactive-primary-hover active:bg-background-screen-active active:text-interactive-primary-active",
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
