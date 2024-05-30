import { Radio, RadioGroup as RadioGroupBase } from "@headlessui/react";
import { clsx } from "clsx/lite";

import { Chip } from "./_Chip";

export interface ChipRadioGroupProps<T = string> {
  name?: string;
  defaultValue?: T;
  value?: T;
  compareValues?: (keyof T & string) | ((a: T, b: T) => boolean);
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: T) => void;
}

export function ChipRadioGroup<T = string>({
  name,
  defaultValue,
  value,
  disabled,
  compareValues,
  className,
  children,
  onChange,
}: ChipRadioGroupProps<T>) {
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

export interface ChipRadioProps<T = string> {
  value: T;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ChipRadio<T = string>({
  value,
  disabled,
  children,
}: ChipRadioProps<T>) {
  return (
    <Radio as={Chip} value={value} disabled={disabled}>
      {children}
    </Radio>
  );
}
