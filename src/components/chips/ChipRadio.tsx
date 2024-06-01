import { Radio, RadioGroup, RadioProvider } from "@ariakit/react";
import { useContext, useMemo } from "react";

import { InputContext } from "../../contexts/InputContext";
import { Chip, ChipGroup, type ChipGroupProps } from "./_Chip";

export interface ChipRadioGroupProps<
  T extends string | number | null = string | number,
> extends ChipGroupProps {
  name?: string;
  value?: T;
  defaultValue?: NoInfer<T>;
  onChange?: (value: T) => void;
}

export function ChipRadioGroup<
  T extends string | number | null = string | number,
>({
  name,
  value,
  defaultValue,
  disabled,
  className,
  children,
  onChange,
}: ChipRadioGroupProps<T>) {
  return (
    <InputContext.Provider value={useMemo(() => ({ name }), [name])}>
      <RadioProvider
        value={value}
        defaultValue={defaultValue}
        setValue={(newValue) => onChange?.(newValue as T)}
      >
        <RadioGroup
          render={({ className: innerClassName, children: innerChildren }) => (
            <ChipGroup disabled={disabled} className={innerClassName}>
              {innerChildren}
            </ChipGroup>
          )}
          className={className}
        >
          {children}
        </RadioGroup>
      </RadioProvider>
    </InputContext.Provider>
  );
}

export interface ChipRadioProps {
  inputRef?: React.Ref<HTMLInputElement>;
  value: string | number;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ChipRadio({
  inputRef,
  value,
  disabled,
  children,
}: ChipRadioProps) {
  const { name } = useContext(InputContext);

  return (
    <Chip
      renderControl={(props) => (
        <Radio
          ref={inputRef}
          name={name}
          value={value}
          disabled={disabled}
          {...props}
        />
      )}
    >
      {children}
    </Chip>
  );
}
