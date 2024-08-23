import {
  Checkbox,
  CheckboxProvider,
  useCheckboxContext,
  useStoreState,
} from "@ariakit/react";
import { CrossCircleFill } from "@transferwise/icons";
import { useContext, useMemo } from "react";

import { InputContext } from "../../contexts/InputContext";
import { Chip, ChipGroup, type ChipGroupProps } from "./_Chip";

export interface ChipCheckboxGroupProps<T extends string = string>
  extends ChipGroupProps {
  name?: string;
  value?: T[]; // TODO: `readonly T[]`
  defaultValue?: NoInfer<T>[]; // TODO: `readonly NoInfer<T>[]`
  onChange?: (value: T[]) => void;
}

export function ChipCheckboxGroup<T extends string = string>({
  name,
  value,
  defaultValue = value === undefined ? [] : undefined,
  disabled,
  className,
  children,
  onChange,
}: ChipCheckboxGroupProps<T>) {
  return (
    <InputContext.Provider value={useMemo(() => ({ name }), [name])}>
      <CheckboxProvider
        value={value}
        defaultValue={defaultValue}
        setValue={(newValue) => onChange?.(newValue as T[])}
      >
        <ChipGroup disabled={disabled} className={className}>
          {children}
        </ChipGroup>
      </CheckboxProvider>
    </InputContext.Provider>
  );
}

export interface ChipCheckboxProps {
  inputRef?: React.Ref<HTMLInputElement>;
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ChipCheckbox({
  inputRef,
  value,
  disabled,
  children,
}: ChipCheckboxProps) {
  const { name } = useContext(InputContext);

  const store = useCheckboxContext();
  const values = useStoreState(store, "value");

  return (
    <Chip
      renderControl={(props) => (
        <Checkbox
          ref={inputRef}
          name={name}
          value={value}
          disabled={disabled}
          {...props}
        />
      )}
    >
      <span className="inline-flex items-center justify-center gap-x-2">
        <span className="flex-1">{children}</span>
        {Array.isArray(values) && values.includes(value) ? (
          <CrossCircleFill size={16} className="-me-2" />
        ) : null}
      </span>
    </Chip>
  );
}
