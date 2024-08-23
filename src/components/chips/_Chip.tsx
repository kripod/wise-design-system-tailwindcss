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
  children?: React.ReactNode;
}

export function Chip({ renderControl, children }: ChipProps) {
  const id = useId();

  return (
    <span className="inline-block">
      {renderControl({ id, className: "peer sr-only" })}
      <Button
        render={({ className, children: innerChildren }) => (
          <label htmlFor={id} className={className}>
            {innerChildren}
          </label>
        )}
        size="sm"
        className="rounded-full px-4 text-interactive-primary ring-1 ring-inset ring-interactive-secondary hover:bg-background-screen-hover hover:text-interactive-primary-hover hover:ring-interactive-secondary-hover active:bg-background-screen-active active:text-interactive-primary-active active:ring-interactive-secondary-active peer-checked:bg-interactive-primary peer-checked:text-interactive-contrast peer-checked:ring-interactive-primary peer-checked:hover:bg-interactive-primary-hover peer-checked:hover:text-interactive-contrast-hover peer-checked:hover:ring-interactive-primary-hover peer-checked:active:bg-interactive-primary-active peer-checked:active:text-interactive-contrast-active peer-checked:active:ring-interactive-primary-active peer-focus-visible:outline peer-focus-visible:outline-offset peer-disabled:pointer-events-none peer-disabled:opacity-45 peer-disabled:mix-blend-luminosity"
      >
        {children}
      </Button>
    </span>
  );
}
