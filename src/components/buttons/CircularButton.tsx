import { clsx } from "clsx";
import * as React from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export type CircularButtonProps = ButtonPropsBase & {
  icon: React.ReactNode;
  disabled?: boolean;
};

export const CircularButton = React.forwardRef(function CircularButton(
  { icon, className, children, ...restProps }: CircularButtonProps,
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
        className="peer inline-flex items-center justify-center rounded-full bg-interactive-accent text-interactive-control after:absolute after:inset-0 hover:bg-interactive-accent-hover active:bg-interactive-accent-active"
        {...restProps}
      >
        {icon}
      </Button>
      <span className="pointer-events-none text-sm font-semibold text-interactive-primary transition peer-hover:text-interactive-primary-hover peer-active:text-interactive-primary-active peer-disabled:opacity-45 peer-disabled:mix-blend-luminosity peer-aria-disabled:opacity-45 peer-aria-disabled:mix-blend-luminosity">
        {children}
      </span>
    </span>
  );
});
