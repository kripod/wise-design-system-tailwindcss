import { RadioGroup as RadioGroupBase } from "@headlessui/react";

import { Chip } from "./_Chip";

export type RadioChipGroupProps<T = string> = {
  name?: string;
  defaultValue?: T;
  selectedValue?: T;
  disabled?: boolean;
  compareValues?: (keyof T & string) | ((a: T, b: T) => boolean);
  children?: React.ReactNode;
  onChange?: (value: T) => void;
};

export function RadioChipGroup<T = string>({
  name,
  defaultValue,
  selectedValue,
  disabled = false,
  compareValues,
  children,
  onChange,
}: RadioChipGroupProps<T>) {
  return (
    <RadioGroupBase
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={defaultValue as any /* TODO: Remove assertion */}
      value={selectedValue}
      disabled={disabled}
      by={compareValues}
      className="flex flex-wrap gap-2"
      onChange={onChange}
    >
      {children}
    </RadioGroupBase>
  );
}

export type RadioChipProps<T = string> = {
  value: T;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function RadioChip<T = string>({
  value,
  disabled = false,
  children,
}: RadioChipProps<T>) {
  return (
    <RadioGroupBase.Option as={Chip} value={value} disabled={disabled}>
      {children}
    </RadioGroupBase.Option>
  );
}
