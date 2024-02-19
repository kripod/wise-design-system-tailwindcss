import { Listbox as ListboxBase } from "@headlessui/react";
import { useId } from "@radix-ui/react-id";
import { Check, ChevronDown, Cross } from "@transferwise/icons";
import { clsx } from "clsx";
import mergeProps from "merge-props";
import * as React from "react";
import { mergeRefs } from "react-merge-refs";

import { useEffectEvent } from "../../hooks/useEffectEvent";
import { useScreenSize } from "../../hooks/useScreenSize";
import { ClearButtonLabel } from "../../i18nTexts";
import { wrapInFragment } from "../../wrapInFragment";
import { BottomSheet } from "../BottomSheet";
import { PolymorphicWithOverrides } from "../PolymorphicWithOverrides";
import { Popover } from "../Popover";
import { ButtonInput } from "./_ButtonInput";
import { InputGroup } from "./InputGroup";
import { SearchInput } from "./SearchInput";

function searchableString(value: string) {
  return value.trim().replace(/\s+/gu, " ").toLowerCase();
}

function inferSearchableStrings(value: unknown) {
  if (typeof value === "string") {
    return [searchableString(value)];
  }

  if (typeof value === "object" && value != null) {
    return Object.values(value)
      .filter(
        (innerValue): innerValue is string => typeof innerValue === "string",
      )
      .map((innerValue) => searchableString(innerValue));
  }

  return [];
}

const SelectInputHasValueContext = React.createContext(false);
const SelectInputTriggerButtonPropsContext = React.createContext<{
  ref?: React.ForwardedRef<HTMLButtonElement>;
  onClick?: () => void;
  [key: string]: unknown;
}>({});
const SelectInputOptionContentWithinTriggerContext = React.createContext(false);

export interface SelectInputOptionItem<T = string> {
  type: "option";
  value: T;
  filterMatchers?: readonly string[];
  disabled?: boolean;
}

export interface SelectInputGroupItem<T = string> {
  type: "group";
  label: string;
  options: readonly SelectInputOptionItem<T>[];
}

export interface SelectInputSeparatorItem {
  type: "separator";
}

export type SelectInputItem<T = string> =
  | SelectInputOptionItem<T>
  | SelectInputGroupItem<T>
  | SelectInputSeparatorItem;

function dedupeSelectInputOptionItem<T>(
  item: SelectInputOptionItem<T>,
  existingValues: Set<T>,
): SelectInputOptionItem<T | undefined> {
  if (existingValues.has(item.value)) {
    return {
      ...item,
      value: undefined,
    };
  }
  existingValues.add(item.value);
  return item;
}

function dedupeSelectInputItems<T>(
  items: readonly SelectInputItem<T>[],
): SelectInputItem<T | undefined>[] {
  const existingValues = new Set<T>();
  return items.map((item) => {
    switch (item.type) {
      case "option": {
        return dedupeSelectInputOptionItem(item, existingValues);
      }
      case "group": {
        return {
          ...item,
          options: item.options.map((option) =>
            dedupeSelectInputOptionItem(option, existingValues),
          ),
        };
      }
      default:
    }
    return item;
  });
}

export interface SelectInputProps<T = string> {
  name?: string;
  placeholder?: string;
  // TODO: multiple?: boolean;
  items: readonly SelectInputItem<NonNullable<T>>[];
  defaultValue?: T;
  value?: T;
  compareValues?:
    | (keyof NonNullable<T> & string)
    | ((a: T | undefined, b: T | undefined) => boolean);
  renderValue?: (
    value: NonNullable<T>,
    withinTrigger: boolean,
  ) => React.ReactNode;
  renderTrigger?: (args: {
    content: React.ReactNode;
    placeholderShown: boolean;
    clear: (() => void) | undefined;
    disabled: boolean;
    className: string | undefined;
  }) => React.ReactNode;
  filterable?: boolean;
  filterPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: T) => void;
  onClear?: () => void;
}

const defaultRenderTrigger = (({
  content,
  placeholderShown,
  clear,
  disabled,
  className,
}) => (
  <InputGroup
    addonEnd={{
      content: (
        <span className="pointer-events-none -ms-1 inline-flex items-center space-x-1">
          {clear != null && !placeholderShown ? (
            <>
              <SelectInputClearButton
                className="pointer-events-auto"
                onClick={(event) => {
                  event.preventDefault();
                  clear();
                }}
              />
              <span className="h-6 border-s" />
            </>
          ) : null}

          <span className="inline-flex h-6 w-6 items-center justify-center">
            <ChevronDown size={16} />
          </span>
        </span>
      ),
      padding: "sm",
    }}
    disabled={disabled}
    className={className}
  >
    <SelectInputTriggerButton as={ButtonInput}>
      {placeholderShown ? (
        <span className="truncate text-content-tertiary">{content}</span>
      ) : (
        content
      )}
    </SelectInputTriggerButton>
  </InputGroup>
)) satisfies SelectInputProps["renderTrigger"];

interface SelectInputClearButtonProps
  extends Pick<
    React.ComponentPropsWithoutRef<"button">,
    "className" | "onClick"
  > {}

function SelectInputClearButton({
  className,
  onClick,
}: SelectInputClearButtonProps) {
  return (
    <button
      type="button"
      aria-label={ClearButtonLabel}
      className={clsx(
        className,
        "inline-flex h-6 w-6 items-center justify-center rounded-xs text-interactive-secondary hover:text-interactive-secondary-hover focus-visible:outline",
      )}
      onClick={onClick}
    >
      <Cross size={16} />
    </button>
  );
}

export function SelectInput<T = string>({
  name,
  placeholder,
  items,
  defaultValue,
  value: controlledValue,
  compareValues,
  renderValue = wrapInFragment,
  renderTrigger = defaultRenderTrigger,
  filterable,
  filterPlaceholder,
  disabled,
  className,
  onChange,
  onClear,
}: SelectInputProps<T>) {
  const [open, setOpen] = React.useState(false);

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const screenSm = useScreenSize("sm");
  const OptionsOverlay = screenSm ? Popover : BottomSheet;

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLDivElement>(null);
  const controllerRef = filterable ? searchInputRef : listboxRef;

  return (
    <ListboxBase
      name={name}
      defaultValue={defaultValue}
      value={controlledValue}
      by={compareValues}
      disabled={disabled}
      onChange={(value) => {
        setOpen(false);
        onChange?.(value);
      }}
    >
      {({ disabled: uiDisabled, value }) => (
        <SelectInputHasValueContext.Provider value={value != null}>
          <OptionsOverlay
            open={open}
            renderTrigger={({ ref, getInteractionProps }) => (
              <SelectInputTriggerButtonPropsContext.Provider
                // eslint-disable-next-line react/jsx-no-constructed-context-values
                value={{
                  ref: mergeRefs([ref, triggerRef]),
                  ...mergeProps(
                    {
                      onClick: () => {
                        setOpen((prev) => !prev);
                      },
                    },
                    getInteractionProps(),
                  ),
                }}
              >
                {renderTrigger({
                  content:
                    value != null ? (
                      <SelectInputOptionContentWithinTriggerContext.Provider
                        value
                      >
                        {renderValue(value, true)}
                      </SelectInputOptionContentWithinTriggerContext.Provider>
                    ) : (
                      placeholder
                    ),
                  placeholderShown: value == null,
                  clear:
                    onClear != null
                      ? () => {
                          onClear();
                          triggerRef.current?.focus({ preventScroll: true });
                        }
                      : undefined,
                  disabled: uiDisabled,
                  className,
                })}
              </SelectInputTriggerButtonPropsContext.Provider>
            )}
            initialFocusRef={controllerRef}
            padding="none"
            onClose={() => {
              setOpen(false);
            }}
          >
            <SelectInputOptions
              items={items}
              renderValue={renderValue}
              filterable={filterable}
              filterPlaceholder={filterPlaceholder}
              searchInputRef={searchInputRef}
              listboxRef={listboxRef}
            />
          </OptionsOverlay>
        </SelectInputHasValueContext.Provider>
      )}
    </ListboxBase>
  );
}

export type SelectInputTriggerButtonProps<
  T extends React.ComponentType | "button" = "button",
> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export function SelectInputTriggerButton<
  T extends React.ComponentType | "button" = "button",
>({ as = "button" as T, ...restProps }: SelectInputTriggerButtonProps<T>) {
  const { ref, onClick, ...interactionProps } = React.useContext(
    SelectInputTriggerButtonPropsContext,
  );

  return (
    <ListboxBase.Button
      ref={ref}
      as={PolymorphicWithOverrides}
      __overrides={{ as, ...interactionProps }}
      {...mergeProps({ onClick }, restProps)}
    />
  );
}

interface SelectInputOptionsContainerProps
  extends React.ComponentPropsWithRef<"div"> {
  onAriaActiveDescendantChange: (
    value: React.AriaAttributes["aria-activedescendant"],
  ) => void;
}

const SelectInputOptionsContainer = React.forwardRef(
  function SelectInputOptionsContainer(
    {
      "aria-orientation": ariaOrientation,
      "aria-activedescendant": ariaActiveDescendant,
      role,
      tabIndex,
      onAriaActiveDescendantChange,
      onKeyDown,
      ...restProps
    }: SelectInputOptionsContainerProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    const handleAriaActiveDescendantChange = useEffectEvent(
      onAriaActiveDescendantChange,
    );
    React.useEffect(() => {
      handleAriaActiveDescendantChange(ariaActiveDescendant);
    }, [ariaActiveDescendant, handleAriaActiveDescendantChange]);

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        ref={ref}
        onKeyDown={(event) => {
          // Prevent absorbing dismissal requests too early
          if (event.key !== "Escape") {
            onKeyDown?.(event);
          }
        }}
        {...restProps}
      />
    );
  },
);

interface SelectInputOptionsProps<T = string>
  extends Pick<
    SelectInputProps<T>,
    "items" | "renderValue" | "filterable" | "filterPlaceholder"
  > {
  searchInputRef: React.RefObject<HTMLInputElement>;
  listboxRef: React.RefObject<HTMLDivElement>;
}

function SelectInputOptions<T = string>({
  items,
  renderValue = wrapInFragment,
  filterable,
  filterPlaceholder,
  searchInputRef,
  listboxRef,
}: SelectInputOptionsProps<T>) {
  const [query, setQuery] = React.useState("");
  const needle = React.useMemo(
    () => (query ? searchableString(query) : null),
    [query],
  );

  const listboxContainerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (listboxContainerRef.current != null) {
      listboxContainerRef.current.style.setProperty(
        "--initial-height",
        `${listboxContainerRef.current.offsetHeight}px`,
      );
    }
  }, []);

  const listboxId = useId();

  const controllerRef = filterable ? searchInputRef : listboxRef;

  return (
    <ListboxBase.Options
      as={SelectInputOptionsContainer}
      static
      className="flex h-full flex-col focus:outline-none sm:max-h-[28rem]"
      onAriaActiveDescendantChange={(
        value: React.AriaAttributes["aria-activedescendant"],
      ) => {
        if (controllerRef.current != null) {
          if (value != null) {
            controllerRef.current.setAttribute("aria-activedescendant", value);
          } else {
            controllerRef.current.removeAttribute("aria-activedescendant");
          }
        }
      }}
    >
      {filterable ? (
        <div className="flex flex-col p-2 pt-0 sm:pt-2">
          <SearchInput
            ref={searchInputRef}
            shape="rectangle"
            placeholder={filterPlaceholder}
            value={query}
            aria-controls={listboxId}
            onKeyDown={(event) => {
              // Prevent interfering with the matcher of Headless UI
              // https://mathiasbynens.be/notes/javascript-unicode#regex
              if (/^.$/u.test(event.key)) {
                event.stopPropagation();
              }
            }}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
            }}
          />
        </div>
      ) : null}

      <div
        ref={listboxContainerRef}
        className={clsx(
          "relative h-[--initial-height] scroll-py-2 overflow-y-auto sm:h-auto",
          items.some((item) => item.type === "group") && "scroll-pt-8",
        )}
      >
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-orientation="vertical"
          tabIndex={0}
          className="p-2 focus:outline-none"
        >
          {(needle == null ? items : dedupeSelectInputItems(items)).map(
            (item, index) => (
              <SelectInputItemView
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                item={item}
                renderValue={renderValue}
                needle={needle}
              />
            ),
          )}
        </div>
      </div>
    </ListboxBase.Options>
  );
}

interface SelectInputItemViewProps<
  T = string,
  I extends SelectInputItem<T | undefined> = SelectInputItem<T | undefined>,
> extends Required<Pick<SelectInputProps<T>, "renderValue">> {
  item: I;
  needle: string | null;
}

function SelectInputItemView<T = string>({
  item,
  renderValue,
  needle,
}: SelectInputItemViewProps<T>) {
  switch (item.type) {
    case "option": {
      if (
        item.value != null &&
        (!needle ||
          inferSearchableStrings(item.filterMatchers ?? item.value).some(
            (haystack) => haystack.includes(needle),
          ))
      ) {
        return (
          <SelectInputOption value={item.value} disabled={item.disabled}>
            {renderValue(item.value, false)}
          </SelectInputOption>
        );
      }
      break;
    }
    case "group": {
      return (
        <SelectInputGroupItemView
          item={item}
          renderValue={renderValue}
          needle={needle}
        />
      );
    }
    case "separator": {
      if (needle == null) {
        return <hr className="m-2 border-t" />;
      }
      break;
    }
  }
  return null;
}

interface SelectInputGroupItemViewProps<T = string>
  extends SelectInputItemViewProps<T, SelectInputGroupItem<T | undefined>> {}

function SelectInputGroupItemView<T = string>({
  item,
  renderValue,
  needle,
}: SelectInputGroupItemViewProps<T>) {
  const headerId = useId();

  return (
    // An empty container may be rendered when no options match `needle`
    // However, pre-filtering would result in worse performance overall
    <section
      role="group"
      aria-labelledby={headerId}
      className={clsx(needle == null && "first:-mt-2")}
    >
      {needle == null ? (
        <header
          id={headerId}
          role="presentation"
          className="sticky top-0 z-10 bg-background-elevated px-4 pb-1 pt-2 text-sm font-medium leading-5 text-content-secondary"
        >
          {item.label}
        </header>
      ) : null}
      {item.options.map((option, index) => (
        <SelectInputItemView
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          item={option}
          renderValue={renderValue}
          needle={needle}
        />
      ))}
    </section>
  );
}

interface SelectInputOptionProps<T = string> {
  value: T;
  disabled?: boolean;
  children?: React.ReactNode;
}

function SelectInputOption<T = string>({
  value,
  disabled,
  children,
}: SelectInputOptionProps<T>) {
  const parentHasValue = React.useContext(SelectInputHasValueContext);

  // Avoid flash during exit transition
  const { current: cachedParentHasValue } = React.useRef(parentHasValue);

  return (
    <ListboxBase.Option
      as="div"
      value={value}
      disabled={disabled}
      className={({ active, disabled: uiDisabled }) =>
        clsx(
          "flex items-center gap-x-2 rounded px-4 py-3 text-base text-content-primary",
          active && "bg-background-screen-hover",
          uiDisabled && "opacity-45",
        )
      }
    >
      {({ selected }) => (
        <>
          {cachedParentHasValue ? (
            <Check size={16} className={clsx(!selected && "invisible")} />
          ) : null}
          <div className="flex-1">{children}</div>
        </>
      )}
    </ListboxBase.Option>
  );
}

export interface SelectInputOptionContentProps {
  title: string;
  note?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function SelectInputOptionContent({
  title,
  note,
  description,
  icon,
}: SelectInputOptionContentProps) {
  const withinTrigger = React.useContext(
    SelectInputOptionContentWithinTriggerContext,
  );

  return (
    <div
      className={clsx(
        "flex items-center gap-x-2 text-content-primary",
        (note || description) && "text-base font-normal",
      )}
    >
      {icon ? (
        <div className={clsx("flex", !withinTrigger && "self-start")}>
          {icon}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className={clsx("space-x-2", withinTrigger && "truncate")}>
          <h4 className="inline">{title}</h4>
          {note ? (
            <span className="text-sm text-content-secondary">{note}</span>
          ) : null}
        </div>

        {description ? (
          <div
            className={clsx(
              "text-sm text-content-secondary",
              withinTrigger && "truncate",
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
