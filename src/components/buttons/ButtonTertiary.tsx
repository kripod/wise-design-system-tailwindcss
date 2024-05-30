import { clsx } from "clsx/lite";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "./_Button";

export interface ButtonTertiaryProps extends ButtonProps {
  size?: "sm" | "md";
}

export const ButtonTertiary = forwardRef(function ButtonTertiary(
  { size = "md", className, ...restProps }: ButtonTertiaryProps,
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
