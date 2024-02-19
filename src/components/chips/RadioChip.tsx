import { RadioGroup as RadioGroupBase } from "@headlessui/react";

import { ChipButton } from "./_ChipButton";

export type RadioChipGroupProps<T = string> = {
  defaultValue?: T;
  selectedValue?: T;
  name?: string;
  disabled?: boolean;
  compareValues?: (keyof T & string) | ((a: T, b: T) => boolean);
  onChange?: (value: T) => void;
  children: React.ReactNode;
};

export function RadioChipGroup<T = string>({
  defaultValue,
  selectedValue,
  name,
  disabled = false,
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
      disabled={disabled}
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
  disabled,
  children,
}: RadioChipProps<T>) {
  return (
    <RadioGroupBase.Option as={ChipButton} value={value} disabled={disabled}>
      {children}
    </RadioGroupBase.Option>
  );
}
