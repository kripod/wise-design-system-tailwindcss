import { clsx } from "clsx";
import * as React from "react";

import { Button, ButtonOwnProps } from "./_Button";

export type TertiaryButtonOwnProps = Pick<ButtonOwnProps, "size" | "loading">;

export type TertiaryButtonProps = React.ComponentPropsWithRef<"button"> &
  TertiaryButtonOwnProps;

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
