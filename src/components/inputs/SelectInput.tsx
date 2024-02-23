import { Listbox as ListboxBase } from "@headlessui/react";
import { useId } from "@radix-ui/react-id";
import { Check, ChevronDown, Cross, CrossCircle } from "@transferwise/icons";
import { clsx } from "clsx";
import mergeProps from "merge-props";
import * as React from "react";
import { mergeRefs } from "react-merge-refs";
import type { Merge } from "ts-essentials";

import { ClearButtonLabel, NoResultsFound } from "../../config/i18nTexts";
import { useEffectEvent } from "../../hooks/useEffectEvent";
import { useScreenSize } from "../../hooks/useScreenSize";
import { BottomSheet } from "../BottomSheet";
import { PolymorphicWithOverrides } from "../PolymorphicWithOverrides";
import { Popover } from "../Popover";
import { ButtonInput } from "./_ButtonInput";
import { InputGroup } from "./InputGroup";
import { SearchInput } from "./SearchInput";

function searchableString(value: string) {
  return value.trim().replace(/\s+/gu, " ").normalize("NFKC").toLowerCase();
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

const SelectInputTriggerButtonPropsContext = React.createContext<{
  ref?: React.ForwardedRef<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
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
  if (!existingValues.has(item.value)) {
    existingValues.add(item.value);
    return item;
  }
  return { ...item, value: undefined };
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

function filterSelectInputOptionItem<T>(
  item: SelectInputOptionItem<T>,
  needle: string,
) {
  return inferSearchableStrings(item.filterMatchers ?? item.value).some(
    (haystack) => haystack.includes(needle),
  );
}

function filterSelectInputItems<T>(
  items: readonly SelectInputItem<T>[],
  needle: string,
) {
  return items.filter((item) => {
    switch (item.type) {
      case "option": {
        return filterSelectInputOptionItem(item, needle);
      }
      case "group": {
        return item.options.some((option) =>
          filterSelectInputOptionItem(option, needle),
        );
      }
      default:
    }
    return false;
  });
}

export interface SelectInputProps<T = string, M extends boolean = false> {
  name?: string;
  multiple?: M;
  placeholder?: string;
  items: readonly SelectInputItem<NonNullable<T>>[];
  defaultValue?: M extends true ? readonly T[] : T;
  value?: M extends true ? readonly T[] : T;
  compareValues?:
    | (keyof NonNullable<T> & string)
    | ((a: T | undefined, b: T | undefined) => boolean);
  renderValue?: (
    value: NonNullable<T>,
    withinTrigger: boolean,
  ) => React.ReactNode;
  renderFooter?: (args: {
    resultsEmpty: boolean;
    queryNormalized: string | null | undefined;
  }) => React.ReactNode;
  renderTrigger?: (args: {
    content: React.ReactNode;
    placeholderShown: boolean;
    clear: (() => void) | undefined;
    disabled: boolean;
    size: "sm" | "md" | "xl";
    className: string | undefined;
  }) => React.ReactNode;
  filterable?: boolean;
  filterPlaceholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "xl";
  className?: string;
  onChange?: (value: M extends true ? T[] : T) => void;
  onClear?: () => void;
}

const defaultRenderTrigger = (({
  content,
  placeholderShown,
  clear,
  disabled,
  size,
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

          <span className="inline-flex size-6 items-center justify-center">
            <ChevronDown size={16} />
          </span>
        </span>
      ),
      padding: "sm",
    }}
    disabled={disabled}
    className={className}
  >
    <SelectInputTriggerButton as={ButtonInput} size={size}>
      <span
        className={clsx(
          "truncate",
          placeholderShown && "text-content-tertiary",
        )}
      >
        {content}
      </span>
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
        "inline-flex size-6 items-center justify-center rounded-xs text-interactive-secondary hover:text-interactive-secondary-hover focus-visible:outline",
      )}
      onClick={onClick}
    >
      <Cross size={16} />
    </button>
  );
}

export function SelectInput<T = string, M extends boolean = false>({
  name,
  multiple,
  placeholder,
  items,
  defaultValue,
  value: controlledValue,
  compareValues,
  renderValue = String,
  renderFooter,
  renderTrigger = defaultRenderTrigger,
  filterable,
  filterPlaceholder,
  disabled,
  size = "md",
  className,
  onChange,
  onClear,
}: SelectInputProps<T, M>) {
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
      multiple={multiple}
      defaultValue={defaultValue}
      value={controlledValue}
      by={compareValues}
      disabled={disabled}
      onChange={
        ((value) => {
          if (!multiple) {
            setOpen(false);
          }
          onChange?.(value);
        }) satisfies SelectInputProps<T, M>["onChange"]
      }
    >
      {({ disabled: uiDisabled, value }) => {
        const placeholderShown =
          multiple && Array.isArray(value) ? value.length === 0 : value == null;
        return (
          <OptionsOverlay
            placement="bottom-start"
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
                      onKeyDown: (event: React.KeyboardEvent) => {
                        if (
                          event.key === " " ||
                          event.key === "Enter" ||
                          event.key === "ArrowDown" ||
                          event.key === "ArrowUp"
                        ) {
                          setOpen((prev) => !prev);
                        }
                      },
                    },
                    getInteractionProps(),
                  ),
                }}
              >
                {renderTrigger({
                  content: !placeholderShown ? (
                    <SelectInputOptionContentWithinTriggerContext.Provider
                      value
                    >
                      {multiple && Array.isArray(value)
                        ? value
                            .map((option: NonNullable<T>) =>
                              renderValue(option, true),
                            )
                            .join(", ")
                        : renderValue(value as NonNullable<T>, true)}
                    </SelectInputOptionContentWithinTriggerContext.Provider>
                  ) : (
                    placeholder
                  ),
                  placeholderShown,
                  clear:
                    onClear != null
                      ? () => {
                          onClear();
                          triggerRef.current?.focus({ preventScroll: true });
                        }
                      : undefined,
                  disabled: uiDisabled,
                  size,
                  className,
                })}
              </SelectInputTriggerButtonPropsContext.Provider>
            )}
            initialFocusRef={controllerRef}
            size={filterable ? "lg" : "md"}
            padding="none"
            onClose={() => {
              setOpen(false);
            }}
          >
            <SelectInputOptions
              items={items}
              renderValue={renderValue}
              renderFooter={renderFooter}
              filterable={filterable}
              filterPlaceholder={filterPlaceholder}
              searchInputRef={searchInputRef}
              listboxRef={listboxRef}
            />
          </OptionsOverlay>
        );
      }}
    </ListboxBase>
  );
}

type SelectInputTriggerButtonElementType = "button" | React.ComponentType;

export type SelectInputTriggerButtonProps<
  T extends SelectInputTriggerButtonElementType = "button",
> = Merge<React.ComponentPropsWithoutRef<T>, { as?: T }>;

export function SelectInputTriggerButton<
  T extends SelectInputTriggerButtonElementType = "button",
>({ as = "button" as T, ...restProps }: SelectInputTriggerButtonProps<T>) {
  const { ref, onClick, onKeyDown, ...interactionProps } = React.useContext(
    SelectInputTriggerButtonPropsContext,
  );

  return (
    <ListboxBase.Button
      ref={ref}
      as={PolymorphicWithOverrides}
      __overrides={{ as, ...interactionProps }}
      {...mergeProps({ onClick, onKeyDown }, restProps)}
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
      <div
        ref={ref}
        role="none"
        onKeyDown={(event) => {
          // Prevent confirmation close without an active item
          if (event.key === "Enter" && ariaActiveDescendant == null) {
            return;
          }

          // Prevent absorbing actions early
          if (event.key === "Escape" || event.key === "Tab") {
            onKeyDown?.({
              ...event,
              preventDefault: () => {},
              stopPropagation: () => {},
            });
            return;
          }

          onKeyDown?.(event);
        }}
        {...restProps}
      />
    );
  },
);

interface SelectInputOptionsProps<T = string>
  extends Pick<
    SelectInputProps<T>,
    | "items"
    | "renderValue"
    | "renderFooter"
    | "filterable"
    | "filterPlaceholder"
  > {
  searchInputRef: React.RefObject<HTMLInputElement>;
  listboxRef: React.RefObject<HTMLDivElement>;
}

function SelectInputOptions<T = string>({
  items,
  renderValue = String,
  renderFooter,
  filterable = false,
  filterPlaceholder,
  searchInputRef,
  listboxRef,
}: SelectInputOptionsProps<T>) {
  const controllerRef = filterable ? searchInputRef : listboxRef;

  const [query, setQuery] = React.useState("");
  const needle = React.useMemo(() => {
    if (filterable) {
      return query ? searchableString(query) : null;
    }
    return undefined;
  }, [filterable, query]);
  const resultsEmpty =
    needle != null && filterSelectInputItems(items, needle).length === 0;

  const listboxContainerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (listboxContainerRef.current != null) {
      listboxContainerRef.current.style.setProperty(
        "--initial-height",
        `${listboxContainerRef.current.offsetHeight}px`,
      );
    }
  }, []);

  const showStatus = resultsEmpty;
  const statusId = useId();
  const listboxId = useId();

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
            if (query) {
              // Ensure having an active option while filtering
              controllerRef.current.dispatchEvent(
                new KeyboardEvent("keydown", { key: "Home", bubbles: true }),
              );
            }
          }
        }
      }}
    >
      {filterable ? (
        <div className="flex flex-col p-2">
          <SearchInput
            ref={searchInputRef}
            shape="rectangle"
            placeholder={filterPlaceholder}
            value={query}
            aria-controls={listboxId}
            aria-describedby={showStatus ? statusId : undefined}
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

      <section
        ref={listboxContainerRef}
        className={clsx(
          "relative h-[--initial-height] scroll-py-2 overflow-y-auto sm:h-auto",
          items.some((item) => item.type === "group") && "scroll-pt-8",
        )}
      >
        {resultsEmpty ? (
          <div id={statusId} className="flex items-center gap-x-2 px-6 pt-2">
            <CrossCircle size={16} className="px-1 text-content-tertiary" />
            {NoResultsFound}
          </div>
        ) : null}

        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-orientation="vertical"
          tabIndex={0}
          className="rounded p-2 focus-visible:outline focus-visible:-outline-offset"
        >
          {(needle != null ? dedupeSelectInputItems(items) : items).map(
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

        {renderFooter != null ? (
          <footer className="px-6 pb-4 pt-1">
            <div
              role="none"
              onKeyDown={(event) => {
                // Prevent interfering with Headless UI
                if (event.key !== "Escape") {
                  event.stopPropagation();
                }
              }}
            >
              {renderFooter({
                resultsEmpty,
                queryNormalized: needle,
              })}
            </div>
          </footer>
        ) : null}
      </section>
    </ListboxBase.Options>
  );
}

interface SelectInputItemViewProps<
  T = string,
  I extends SelectInputItem<T | undefined> = SelectInputItem<T | undefined>,
> extends Required<Pick<SelectInputProps<T>, "renderValue">> {
  item: I;
  needle: string | null | undefined;
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
        (needle == null || filterSelectInputOptionItem(item, needle))
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
      className={clsx(needle === null && "first:-mt-2")}
    >
      {needle == null ? (
        <header
          id={headerId}
          role="none"
          className="sticky top-0 z-10 bg-background-elevated px-4 pb-1 pt-2 text-title-group text-content-secondary"
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
  return (
    <ListboxBase.Option
      as="div"
      value={value}
      disabled={disabled}
      className={({ active, disabled: uiDisabled }) =>
        clsx(
          "flex cursor-default select-none items-center gap-x-2 rounded px-4 py-3 text-body-lg text-interactive-primary",
          active && "ring-1 ring-inset ring-interactive-secondary",
          uiDisabled && "opacity-45",
        )
      }
    >
      {({ selected }) => (
        <>
          <div className="flex-1">{children}</div>
          <Check
            size={16}
            className={clsx(
              // Prevent layout shifts by pre-allocating space
              !selected && "invisible",
            )}
          />
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
        (note || description) && "text-body-lg",
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
            <span className="text-body text-content-secondary">{note}</span>
          ) : null}
        </div>

        {description ? (
          <div
            className={clsx(
              "text-body text-content-secondary",
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
