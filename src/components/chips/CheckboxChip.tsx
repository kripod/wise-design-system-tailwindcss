import { CrossCircleFill } from "@transferwise/icons";
import { clsx } from "clsx";
import * as React from "react";

import { __DEV__ } from "../../env";
import { useControllableState } from "../../hooks/useControllableState";
import { Offscreen } from "../Offscreen";
import { Chip } from "./_Chip";

export type CheckboxChipGroupProps = {
  children?: React.ReactNode;
};

export function CheckboxChipGroup({ children }: CheckboxChipGroupProps) {
  return <fieldset className="flex flex-wrap gap-2">{children}</fieldset>;
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
  const [checked, setChecked] = useControllableState(
    controlledChecked,
    defaultChecked ?? false,
    onChange,
  );

  return (
    <>
      {__DEV__ ? (
        <Offscreen>
          {/* Warn when mixing controlled and uncontrolled attributes */}
          <input
            type="checkbox"
            defaultChecked={defaultChecked}
            checked={controlledChecked}
            readOnly
            hidden
          />
        </Offscreen>
      ) : null}

      {name != null && checked ? (
        <input
          type="checkbox"
          name={name}
          value={value}
          checked
          readOnly
          hidden
        />
      ) : null}
      <Chip
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        className="group/button gap-x-4"
        onClick={() => {
          setChecked((prev) => !prev);
        }}
      >
        {children}
        {checked ? (
          <CrossCircleFill
            size={16}
            className="-mx-2 group-enabled/button:group-hover/button:text-interactive-control-hover group-enabled/button:group-active/button:text-interactive-control-active"
          />
        ) : null}
      </Chip>
    </>
  );
}
