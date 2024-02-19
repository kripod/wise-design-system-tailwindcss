import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import { Listbox as ListboxBase } from "@headlessui/react";
import { ChevronDown } from "@transferwise/icons";
import { clsx } from "clsx";
import { getResetClassName } from "css-homogenizer/reset-scoped";
import * as React from "react";

import { identity } from "../../identity";
import {
  formControlClassNameBase,
  useFormControlAriaAttributes,
} from "./_FormControl";

export interface SelectInputProps<T = string> {
  name?: string;
  placeholder?: string;
  // TODO: multiple?: boolean;
  defaultValue?: T;
  value?: T;
  renderValue?: (value: T) => React.ReactNode;
  compareValues?: (keyof T & string) | ((a: T, b: T) => boolean);
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: T) => void;
}

const placeholderValue = ""; // See: https://html.spec.whatwg.org/multipage/form-elements.html#placeholder-label-option

export function SelectInput<T = string>({
  name,
  placeholder,
  defaultValue,
  value: controlledValue,
  renderValue = identity,
  compareValues,
  disabled,
  className,
  children,
  onChange,
  ...restProps
}: SelectInputProps<T>) {
  const formControlAriaAttributes = useFormControlAriaAttributes();

  const [maxHeight, setMaxHeight] = React.useState<number>();
  const [width, setWidth] = React.useState<number>();
  const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
    placement: "bottom-start",
    middleware: [
      offset(8),
      flip({ padding: 16 }),
      size({
        padding: 16,
        apply: ({ rects, availableHeight }) => {
          setMaxHeight(availableHeight);
          setWidth(rects.reference.width);
        },
      }),
      // shift({ limiter: limitShift(), padding: 16 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <ListboxBase
      name={name}
      defaultValue={
        controlledValue === undefined && defaultValue === undefined
          ? placeholderValue
          : defaultValue
      }
      value={controlledValue}
      by={compareValues}
      disabled={disabled}
      onChange={onChange}
    >
      <ListboxBase.Button
        ref={refs.setReference}
        {...formControlAriaAttributes}
        className={clsx(
          getResetClassName("button"),
          className,
          formControlClassNameBase({ size: "md" }),
          "inline-flex items-center gap-x-2 rounded text-start",
        )}
        {...restProps}
      >
        {({ value }: { value: T | typeof placeholderValue }) => (
          <>
            <span className="flex-1 truncate">
              {value === placeholderValue
                ? placeholder && (
                    <span className="text-content-tertiary">{placeholder}</span>
                  )
                : renderValue(value)}
            </span>
            <ChevronDown size={16} />
          </>
        )}
      </ListboxBase.Button>

      <FloatingPortal>
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
