import { CrossCircleFill } from "@transferwise/icons";
import { clsx } from "clsx/lite";

import { useControllableState } from "../../hooks/useControllableState";
import { __DEV__ } from "../../utils/env";
import { Offscreen } from "../Offscreen";
import { Chip } from "./_Chip";

export interface ChipCheckboxGroupProps {
  className?: string;
  children?: React.ReactNode;
}

export function ChipCheckboxGroup({
  className,
  children,
}: ChipCheckboxGroupProps) {
  return (
    <div className={clsx(className, "flex flex-wrap gap-2")}>{children}</div>
  );
}

export interface ChipCheckboxProps {
  name?: string;
  value?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

export function ChipCheckbox({
  name,
  value = "on",
  defaultChecked,
  checked: controlledChecked,
  disabled,
  children,
  onChange,
}: ChipCheckboxProps) {
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
        className="group/button"
        onClick={() => {
          setChecked((prev) => !prev);
        }}
      >
        <span className="inline-flex items-center justify-center gap-x-2">
          <span className="flex-1">{children}</span>
          {checked ? (
            <CrossCircleFill
              size={16}
              className="-me-2 group-hover/button:text-interactive-control-hover group-active/button:text-interactive-control-active"
            />
          ) : null}
        </span>
      </Chip>
    </>
  );
}
