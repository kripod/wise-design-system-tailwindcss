import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export type CircularButtonProps = Omit<ButtonPropsBase, "loading"> & {
  icon: React.ReactNode;
};

export const CircularButton = React.forwardRef(function CircularButton(
  {
    icon,
    disabled = false,
    className,
    children,
    ...restProps
  }: CircularButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const labelId = React.useId();
  return (
    <span
      className={clsx(
        "relative inline-flex flex-col items-center gap-y-2",
        className,
      )}
    >
      <Button
        ref={ref}
        aria-labelledby={labelId}
        size="lg"
        equilateral
        disabled={disabled}
        className="peer rounded-full bg-interactive-accent text-interactive-control after:absolute after:inset-0 enabled:hover:bg-interactive-accent-hover enabled:active:bg-interactive-accent-active"
        {...restProps}
      >
        {icon}
      </Button>
      <span
        id={labelId}
        className="text-sm font-semibold text-interactive-primary transition peer-enabled:peer-hover:text-interactive-primary-hover peer-enabled:peer-active:text-interactive-primary-active peer-disabled:cursor-not-allowed peer-disabled:opacity-45 peer-disabled:mix-blend-luminosity"
      >
        {children}
      </span>
    </span>
  );
});
