import { clsx } from "clsx/lite";
import { useId } from "react";

import { Button } from "../buttons/_Button";

export interface ChipGroupProps {
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ChipGroup({ disabled, className, children }: ChipGroupProps) {
  return (
    <fieldset
      disabled={disabled}
      className={clsx(className, "flex flex-wrap gap-2")}
    >
      {children}
    </fieldset>
  );
}

interface ChipControlProps {
  id: string;
  className: string;
}

export interface ChipProps {
  renderControl: (props: ChipControlProps) => React.ReactNode;
  buttonClassName?: string;
  children?: React.ReactNode;
}

export function Chip({ renderControl, buttonClassName, children }: ChipProps) {
  const id = useId();

  return (
    <span className="inline-block">
      {renderControl({ id, className: "peer sr-only" })}
      <Button
        render={({ className, children: innerChildren }) => (
          <label htmlFor={id} className={clsx(buttonClassName, className)}>
            {innerChildren}
          </label>
        )}
        size="sm"
        className="rounded-full px-4 text-interactive-primary ring-1 ring-inset ring-interactive-secondary hover:bg-background-screen-hover hover:text-interactive-primary-hover hover:ring-interactive-secondary-hover active:bg-background-screen-active active:text-interactive-primary-active active:ring-interactive-secondary-active peer-focus-visible:outline peer-focus-visible:outline-offset peer-disabled:pointer-events-none peer-disabled:opacity-45 peer-disabled:mix-blend-luminosity peer-aria-checked:bg-interactive-accent peer-aria-checked:text-interactive-control peer-aria-checked:ring-interactive-accent peer-aria-checked:hover:bg-interactive-accent-hover peer-aria-checked:hover:ring-interactive-accent-hover peer-aria-checked:active:bg-interactive-accent-active peer-aria-checked:active:ring-interactive-accent-active"
      >
        {children}
      </Button>
    </span>
  );
}
