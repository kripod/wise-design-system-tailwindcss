import { Radio, RadioGroup as RadioGroupBase } from "@headlessui/react";
import { clsx } from "clsx/lite";

import { Chip } from "./_Chip";

export interface RadioChipGroupProps<T = string> {
  name?: string;
  defaultValue?: T;
  value?: T;
  compareValues?: (keyof T & string) | ((a: T, b: T) => boolean);
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: T) => void;
}

export function RadioChipGroup<T = string>({
  name,
  defaultValue,
  value,
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
      value={value}
      by={compareValues}
      disabled={disabled}
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
    <Radio as={Chip} value={value} disabled={disabled}>
      {children}
    </Radio>
  );
}
