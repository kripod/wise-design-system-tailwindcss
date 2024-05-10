import { clsx } from "clsx/lite";
import { forwardRef, useId } from "react";

import { Button, type ButtonPropsBase } from "./_Button";

export interface CircularButtonProps extends ButtonPropsBase {
  icon: React.ReactNode;
  disabled?: boolean;
}

export const CircularButton = forwardRef(function CircularButton(
  { icon, className, children, ...restProps }: CircularButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const labelId = useId();
  return (
    <span
      className={clsx(
        className,
        "relative inline-flex flex-col items-center gap-y-2",
      )}
    >
      <Button
        ref={ref}
        aria-labelledby={labelId}
        className="peer inline-flex size-14 items-center justify-center rounded-full bg-interactive-accent text-interactive-control after:absolute after:inset-0 hover:bg-interactive-accent-hover active:bg-interactive-accent-active"
        {...restProps}
      >
        {icon}
      </Button>
      <span className="pointer-events-none text-body font-semibold text-interactive-primary transition peer-hover:text-interactive-primary-hover peer-active:text-interactive-primary-active peer-disabled:opacity-45 peer-disabled:mix-blend-luminosity peer-aria-disabled:opacity-45 peer-aria-disabled:mix-blend-luminosity">
        {children}
      </span>
    </span>
  );
});
