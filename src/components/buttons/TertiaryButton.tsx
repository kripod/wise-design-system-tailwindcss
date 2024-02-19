import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export interface TertiaryButtonProps extends ButtonPropsBase {
  size?: "sm" | "md";
}

export const TertiaryButton = React.forwardRef(function TertiaryButton(
  { size = "md", className, ...restProps }: TertiaryButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      size={size}
      className={clsx(
        className,
        "rounded-full px-4 text-interactive-primary underline underline-offset-2 hover:text-interactive-primary-hover active:bg-background-screen-active active:text-interactive-primary-active",
      )}
      {...restProps}
    />
  );
});
