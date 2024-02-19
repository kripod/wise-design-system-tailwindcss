import { clsx } from "clsx";
import * as React from "react";

import { cssValueWithUnit } from "../../cssValueWithUnit";
import { useResizeObserver } from "../../hooks/useResizeObserver";

type InputPaddingContextType = [
  number | string | undefined,
  React.Dispatch<React.SetStateAction<number | string | undefined>>,
];

const InputPaddingStartContext = React.createContext<InputPaddingContextType>([
  undefined,
  () => {},
]);

const InputPaddingEndContext = React.createContext<InputPaddingContextType>([
  undefined,
  () => {},
]);

export function useInputPaddings() {
  const [paddingStart] = React.useContext(InputPaddingStartContext);
  const [paddingEnd] = React.useContext(InputPaddingEndContext);

  return {
    paddingInlineStart: paddingStart,
    paddingInlineEnd: paddingEnd,
  } satisfies React.CSSProperties;
}

interface InputGroupAddon {
  content: React.ReactNode;
  initialContentWidth?: number | string;
  interactive?: boolean;
  padding?: "none" | "sm" | "md";
}

export interface InputGroupProps {
  addonStart?: InputGroupAddon;
  addonEnd?: InputGroupAddon;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function inputPaddingInitialState({
  initialContentWidth,
  padding = inputAddonDefaultPadding,
}: Pick<
  InputGroupAddon,
  "initialContentWidth" | "padding"
> = {}): () => InputPaddingContextType[0] {
  return () =>
    initialContentWidth != null
      ? `calc(${cssValueWithUnit(initialContentWidth)} + ${cssValueWithUnit(
          inputAddonContentWidthAddendByPadding[padding],
        )})`
      : undefined;
}

export function InputGroup({
  addonStart,
  addonEnd,
  disabled,
  className,
  children,
}: InputGroupProps) {
  const [paddingStart, setPaddingStart] = React.useState(
    inputPaddingInitialState(addonStart),
  );
  const [paddingEnd, setPaddingEnd] = React.useState(
    inputPaddingInitialState(addonEnd),
  );

  return (
    <InputPaddingStartContext.Provider
      value={React.useMemo(
        () => [paddingStart, setPaddingStart],
        [paddingStart],
      )}
    >
      <InputPaddingEndContext.Provider
        value={React.useMemo(() => [paddingEnd, setPaddingEnd], [paddingEnd])}
      >
        <fieldset
          disabled={disabled}
          className={clsx(
            className,
            "group/input inline-grid auto-cols-fr [&>*]:col-start-1 [&>*]:row-start-1",
            "rounded-full", // Prevent unwanted `group-hover/input` triggers
          )}
        >
          {addonStart != null ? (
            <InputAddon placement="start" {...addonStart} />
          ) : null}
          {children}
          {addonEnd != null ? (
            <InputAddon placement="end" {...addonEnd} />
          ) : null}
        </fieldset>
      </InputPaddingEndContext.Provider>
    </InputPaddingStartContext.Provider>
  );
}

interface InputAddonProps extends Omit<InputGroupAddon, "initialContentWidth"> {
  placement: "start" | "end";
}

const inputAddonContentWidthAddendByPadding = {
  none: 0,
  sm: "1rem",
  md: "1.5rem",
} satisfies {
  [key in NonNullable<InputAddonProps["padding"]>]: InputPaddingContextType[0];
};

const inputAddonDefaultPadding = "md" satisfies InputAddonProps["padding"];

function InputAddon({
  placement,
  content,
  interactive,
  padding = inputAddonDefaultPadding,
}: InputAddonProps) {
  const [, setInputPadding] = React.useContext(
    placement === "start" ? InputPaddingStartContext : InputPaddingEndContext,
  );

  const ref = React.useRef<HTMLSpanElement>(null);
  useResizeObserver(ref, (entry) => {
    // TODO: Remove fallback once most browsers support `borderBoxSize`
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (entry.borderBoxSize != null) {
      setInputPadding(entry.borderBoxSize[0].inlineSize);
    } else {
      const targetStyle = getComputedStyle(entry.target);
      setInputPadding(
        entry.contentRect.width +
          Number.parseFloat(targetStyle.paddingInlineStart) +
          Number.parseFloat(targetStyle.paddingInlineEnd),
      );
    }
  });

  return (
    <span
      ref={ref}
      className={clsx(
        "pointer-events-none z-10 inline-flex items-center text-interactive-secondary transition group-[:has(>:is(input,button,select):focus-visible)]/input:!text-interactive-primary group-[:has(>:is(input,button,select):hover)]/input:text-interactive-secondary-hover",
        {
          "justify-self-start": placement === "start",
          "justify-self-end": placement === "end",
        },
        interactive
          ? "[&>*]:pointer-events-auto"
          : "group-disabled/input:opacity-45 group-disabled/input:mix-blend-luminosity",
        {
          "px-2": padding === "sm",
          [clsx("px-4", {
            "pe-2": placement === "start",
            "ps-2": placement === "end",
          })]: padding === "md",
        },
      )}
    >
      {content}
    </span>
  );
}
