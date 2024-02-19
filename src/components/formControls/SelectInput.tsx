import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import { Listbox as ListboxBase } from "@headlessui/react";
import { ChevronDown, Cross } from "@transferwise/icons";
import { clsx } from "clsx";
import { getResetClassName } from "css-homogenizer/reset-scoped";
import * as React from "react";

import { identity } from "../../identity";
import { PreventScroll } from "../PreventScroll";
import {
  formControlClassNameBase,
  useFormControlAriaAttributes,
} from "./_FormControl";

export interface SelectInputProps<T = string, R extends boolean = false> {
  name?: string;
  placeholder?: string;
  // TODO: multiple?: boolean;
  defaultValue?: T;
  value?: T;
  renderValue?: (value: T) => React.ReactNode;
  compareValues?:
    | (keyof NonNullable<T> & string)
    | ((a: T | undefined, b: T | undefined) => boolean);
  required?: R;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: T | (R extends false ? undefined : never)) => void;
}

export function SelectInput<T = string, R extends boolean = false>({
  name,
  placeholder,
  defaultValue,
  value: controlledValue,
  renderValue = identity,
  compareValues,
  required,
  disabled,
  className,
  children,
  onChange,
  ...restProps
}: SelectInputProps<T, R>) {
  const formControlAriaAttributes = useFormControlAriaAttributes();

  const [maxHeight, setMaxHeight] = React.useState<number>();
  const [width, setWidth] = React.useState<number>();
  const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
    middleware: [
      offset(8),
      flip({ padding: 16, crossAxis: false }),
      size({
        padding: 16,
        apply: ({ rects, availableHeight }) => {
          setMaxHeight(availableHeight);
          setWidth(rects.reference.width);
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <ListboxBase
      name={name}
      defaultValue={defaultValue}
      value={controlledValue}
      by={compareValues}
      disabled={disabled}
      onChange={onChange}
    >
      {({ open }) => (
        <>
          <ListboxBase.Button
            ref={refs.setReference}
            className={clsx(
              getResetClassName("button"),
              className,
              formControlClassNameBase({ size: "md" }),
              "inline-flex items-center gap-x-2 rounded text-start",
            )}
            {...formControlAriaAttributes}
            {...restProps}
          >
            {({ value }: { value: T | undefined }) => (
              <>
                <span className="flex-1 truncate">
                  {value !== undefined ? (
                    renderValue(value)
                  ) : (
                    <span className="text-content-tertiary">{placeholder}</span>
                  )}
                </span>

                {!required && value !== undefined ? (
                  <>
                    <Cross size={16} />
                    <span className="inline-block h-6 border-s" />
                  </>
                ) : null}

                <ChevronDown size={16} />
              </>
            )}
          </ListboxBase.Button>

          {open ? (
            <FloatingPortal>
              <PreventScroll />
              <ListboxBase.Options
                ref={refs.setFloating}
                className={clsx(
                  getResetClassName("ul"),
                  "z-10 overflow-auto rounded bg-background-elevated p-2 shadow-xl focus:outline-none",
                )}
                style={{
                  ...floatingStyles,
                  maxHeight,
                  width,
                }}
              >
                {children}
              </ListboxBase.Options>
            </FloatingPortal>
          ) : null}
        </>
      )}
    </ListboxBase>
  );
}

export interface SelectInputOptionProps<T = string> {
  value: T;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function SelectInputOption<T = string>({
  value,
  disabled,
  children,
}: SelectInputOptionProps<T>) {
  return (
    <ListboxBase.Option
      value={value}
      disabled={disabled}
      className={({ active, selected, disabled: uiDisabled }) =>
        clsx(
          "rounded px-4 py-3 text-base text-content-primary",
          active && "-outline-offset outline",
          selected
            ? "bg-background-screen-active"
            : active && "bg-background-screen-hover",
          uiDisabled && "opacity-45",
        )
      }
    >
      {children}
    </ListboxBase.Option>
  );
}
