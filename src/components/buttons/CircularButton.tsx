import { useId } from "@radix-ui/react-id";
import { clsx } from "clsx";
import * as React from "react";

import { Button } from "./_Button";

export type CircularButtonOwnProps = {
  icon?: React.ReactNode;
};

export type CircularButtonProps = React.ComponentPropsWithRef<"button"> &
  CircularButtonOwnProps;

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
  const labelId = useId(); // TODO: Replace with the built-in hook in React 18
  return (
    /* TODO: Make outer element a button and the inner one just a span */
    <span className="relative inline-flex flex-col items-center gap-y-2">
      <Button
        ref={ref}
        aria-labelledby={labelId}
        size="lg"
        equilateral
        disabled={disabled}
        className={clsx(
          "peer bg-interactive-accent px-4 text-interactive-control after:absolute after:inset-0",
          !disabled &&
            "hover:bg-interactive-accent-hover active:bg-interactive-accent-active",
          className,
        )}
        {...restProps}
      >
        {icon}
      </Button>
      <span
        id={labelId}
        className={clsx(
          "text-sm font-semibold tracking-2.5 text-interactive-primary transition",
          !disabled
            ? "peer-hover:text-interactive-primary-hover peer-active:text-interactive-primary-active"
            : "cursor-not-allowed opacity-45 mix-blend-luminosity",
        )}
      >
        {children}
      </span>
    </span>
  );
});
