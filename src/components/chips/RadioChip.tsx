import { RadioGroup as RadioGroupBase } from "@headlessui/react";
import { clsx } from "clsx";

import { Chip } from "./_Chip";

export interface RadioChipGroupProps<T = string> {
  name?: string;
  defaultValue?: T;
  selectedValue?: T;
  disabled?: boolean;
  compareValues?: (keyof T & string) | ((a: T, b: T) => boolean);
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: T) => void;
}

export function RadioChipGroup<T = string>({
  name,
  defaultValue,
  selectedValue,
  disabled,
  compareValues,
  className,
  children,
  onChange,
}: RadioChipGroupProps<T>) {
  return (
    <RadioGroupBase
      name={name}
      defaultValue={defaultValue}
      value={selectedValue}
      disabled={disabled}
      by={compareValues}
      className={clsx(className, "flex flex-wrap gap-2")}
      onChange={onChange}
    >
      {children}
    </RadioGroupBase>
  );
}

export interface RadioChipProps<T = string> {
  value: T;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function RadioChip<T = string>({
  value,
  disabled,
  children,
}: RadioChipProps<T>) {
  return (
    <RadioGroupBase.Option as={Chip} value={value} disabled={disabled}>
      {children}
    </RadioGroupBase.Option>
  );
}
