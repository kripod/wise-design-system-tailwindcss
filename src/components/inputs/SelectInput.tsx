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

import { identity } from "../../identity";
import { PreventScroll } from "../PreventScroll";
import { inputClassNameBase } from "./_Input";
import { useInputAriaAttributes } from "./Field";
import { InputGroup } from "./InputGroup";

export interface SelectInputProps<T = string> {
  name?: string;
  placeholder?: string;
  // TODO: multiple?: boolean;
  defaultValue?: T;
  value?: T;
  renderValue?: (value: NonNullable<T>) => React.ReactNode;
  compareValues?:
    | (keyof NonNullable<T> & string)
    | ((a: T | undefined, b: T | undefined) => boolean);
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: T) => void;
  onClear?: () => void;
}

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
  onClear,
  ...restProps
}: SelectInputProps<T>) {
  const inputAriaAttributes = useInputAriaAttributes();

  const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
    middleware: [
      offset(8),
      flip({ padding: 16, crossAxis: false }),
      size({
        padding: 16,
        apply: ({ elements, rects, availableHeight }) => {
          elements.floating.style.setProperty(
            "max-height",
            `${availableHeight}px`,
          );
          elements.floating.style.setProperty(
            "width",
            `${rects.reference.width}px`,
          );
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
      {({ value, open }) => (
        <>
          <InputGroup
            addonEnd={{
              content: (
                <span className="!pointer-events-none inline-flex items-center">
                  {onClear != null && value != null ? (
                    <>
                      <button
                        type="button"
                        className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-xs text-interactive-secondary hover:text-interactive-secondary-hover focus-visible:outline"
                        onClick={(event) => {
                          event.preventDefault();
                          onClear();
                        }}
                      >
                        <Cross size={16} />
                      </button>
                      <span className="h-6 border-s" />
                    </>
                  ) : null}

                  <span className="inline-flex h-8 w-8 items-center justify-center">
                    <ChevronDown size={16} />
                  </span>
                </span>
              ),
              interactive: true,
              padding: "sm",
            }}
            className={className}
          >
            <ListboxBase.Button
              ref={refs.setReference}
              className={clsx(
                getResetClassName("button"),
                inputClassNameBase({ size: "md" }),
                "rounded text-start",
              )}
              {...inputAriaAttributes}
              {...restProps}
            >
              <span className="flex-1 truncate">
                {value != null ? (
                  renderValue(value)
                ) : (
                  <span className="text-content-tertiary">{placeholder}</span>
                )}
              </span>
            </ListboxBase.Button>
          </InputGroup>

          {open ? (
            <FloatingPortal>
              <PreventScroll />
              <ListboxBase.Options
                ref={refs.setFloating}
                className={clsx(
                  getResetClassName("ul"),
                  "z-10 overflow-auto rounded bg-background-elevated p-2 shadow-xl focus:outline-none",
                )}
                style={floatingStyles}
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
