import { clsx } from "clsx";
import * as React from "react";

import { parseBooleanish } from "../../parseBooleanish";
import { Button, ButtonProps } from "../buttons/_Button";

export type ChipButtonProps = ButtonProps;

export const ChipButton = React.forwardRef(function ChipButton(
  {
    "aria-disabled": ariaDisabledRaw,
    disabled = ariaDisabledRaw != null
      ? parseBooleanish(ariaDisabledRaw)
      : false,
    className,
    children,
    ...restProps
  }: ChipButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      disabled={disabled}
      aria-disabled={!disabled ? ariaDisabledRaw : undefined}
      className={clsx(
        "rounded-full border border-interactive-secondary px-4 font-semibold text-interactive-primary",
        !disabled &&
          "hover:border-interactive-secondary-hover hover:bg-background-screen-hover hover:text-interactive-primary-hover active:border-interactive-secondary-active active:bg-background-screen-active active:text-interactive-primary-active ui-checked:border-transparent ui-checked:bg-interactive-accent ui-checked:text-interactive-control ui-checked:hover:bg-interactive-accent-hover ui-checked:active:bg-interactive-accent-active",
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
});
