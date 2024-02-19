import { RadioGroup as RadioGroupBase } from "@headlessui/react";
import { clsx } from "clsx";

import { Button } from "../buttons/_Button";

export type RadioChipGroupProps<T = string> = {
  defaultValue?: T;
  selectedValue?: T;
  name?: string;
  compareValues?: (keyof T & string) | ((a: T, b: T) => boolean);
  onChange?: (value: T) => void;
  children: React.ReactNode;
};

export function RadioChipGroup<T = string>({
  defaultValue,
  selectedValue,
  name,
  compareValues,
  onChange,
  children,
}: RadioChipGroupProps<T>) {
  return (
    <RadioGroupBase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={defaultValue as any /* TODO: Remove assertion */}
      value={selectedValue}
      name={name}
      by={compareValues}
      className="inline-flex flex-wrap gap-2"
      onChange={onChange}
    >
      {children}
    </RadioGroupBase>
  );
}

export type RadioChipProps<T = string> = {
  value: T;
  disabled?: boolean;
  children: React.ReactNode;
};

export function RadioChip<T = string>({
  value,
  disabled = false,
  children,
}: RadioChipProps<T>) {
  return (
    <RadioGroupBase.Option
      as={Button}
      size="sm"
      value={value}
      disabled={disabled}
      className={clsx(
        "rounded-full border border-interactive-secondary px-4 font-semibold text-interactive-primary",
        !disabled &&
          "hover:border-interactive-secondary-hover hover:bg-background-screen-hover hover:text-interactive-primary-hover active:border-interactive-secondary-active active:bg-background-screen-active active:text-interactive-primary-active ui-checked:border-transparent ui-checked:bg-interactive-accent ui-checked:text-interactive-control ui-checked:hover:bg-interactive-accent-hover ui-checked:active:bg-interactive-accent-active",
      )}
    >
      <span className="-mx-px">{children}</span>
    </RadioGroupBase.Option>
  );
}
