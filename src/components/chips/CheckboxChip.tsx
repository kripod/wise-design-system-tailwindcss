import { CrossCircleFill } from "@transferwise/icons";
import { clsx } from "clsx";
import * as React from "react";

import { useControllableState } from "../../hooks/useControllableState";
import { Chip } from "./_Chip";

const CheckboxChipGroupContext = React.createContext({ disabled: false });

export type CheckboxChipGroupProps = {
  disabled?: boolean;
  children?: React.ReactNode;
};

export function CheckboxChipGroup({
  disabled = false,
  children,
}: CheckboxChipGroupProps) {
  return (
    <CheckboxChipGroupContext.Provider
      value={React.useMemo(() => ({ disabled }), [disabled])}
    >
      <div className="inline-flex flex-wrap gap-2">{children}</div>
    </CheckboxChipGroupContext.Provider>
  );
}

export type CheckboxChipProps = {
  name?: string;
  value?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
};

export function CheckboxChip({
  name,
  value = "on",
  defaultChecked,
  checked: controlledChecked,
  disabled = false,
  onChange,
  children,
}: CheckboxChipProps) {
  const { disabled: groupDisabled } = React.useContext(
    CheckboxChipGroupContext,
  );
  const [checked, setChecked] = useControllableState(
    controlledChecked,
    defaultChecked ?? false,
    onChange,
  );

  return (
    <>
      {name != null ? (
        <input
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={defaultChecked} // For controlled/uncontrolled warning
          checked={controlledChecked}
          hidden
          onChange={() => {}} // Suppress read-only field warning
        />
      ) : null}
      <Chip
        aria-checked={checked}
        disabled={disabled || groupDisabled}
        className="group/button gap-x-4"
        onClick={() => {
          setChecked((prev) => !prev);
        }}
      >
        {children}
        {checked ? (
          <CrossCircleFill
            size={16}
            className={clsx(
              "-mx-2",
              !disabled &&
                !groupDisabled &&
                "group-hover/button:text-interactive-control-hover group-active/button:text-interactive-control-active",
            )}
          />
        ) : null}
      </Chip>
    </>
  );
}
