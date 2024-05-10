import { clsx } from "clsx/lite";
import { createContext, useContext, useMemo, useRef, useState } from "react";

import { useResizeObserver } from "../../hooks/useResizeObserver";
import { cssValueWithUnit } from "../../utils/cssValueWithUnit";

type InputPaddingContextType = [
  number | string | undefined,
  React.Dispatch<React.SetStateAction<number | string | undefined>>,
];

const InputPaddingStartContext = createContext<InputPaddingContextType>([
  undefined,
  () => {},
]);

const InputPaddingEndContext = createContext<InputPaddingContextType>([
  undefined,
  () => {},
]);

export function useInputPaddings() {
  const [paddingStart] = useContext(InputPaddingStartContext);
  const [paddingEnd] = useContext(InputPaddingEndContext);

  return {
    paddingInlineStart: paddingStart,
    paddingInlineEnd: paddingEnd,
  } satisfies React.CSSProperties;
}

export interface InputGroupAddon {
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
  const [paddingStart, setPaddingStart] = useState(
    inputPaddingInitialState(addonStart),
  );
  const [paddingEnd, setPaddingEnd] = useState(
    inputPaddingInitialState(addonEnd),
  );

  return (
    <InputPaddingStartContext.Provider
      value={useMemo(() => [paddingStart, setPaddingStart], [paddingStart])}
    >
      <InputPaddingEndContext.Provider
        value={useMemo(() => [paddingEnd, setPaddingEnd], [paddingEnd])}
      >
        <fieldset
          disabled={disabled}
          className={clsx(
            className,
            "group/input inline-grid auto-cols-fr *:col-start-1 *:row-start-1",
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
  const [, setInputPadding] = useContext(
    placement === "start" ? InputPaddingStartContext : InputPaddingEndContext,
  );

  const ref = useRef<HTMLSpanElement>(null);
  useResizeObserver(ref, (entry) => {
    // TODO: Remove fallback once most browsers support `borderBoxSize`
    const inlineSize = entry.borderBoxSize?.[0]?.inlineSize;
    if (inlineSize != null) {
      setInputPadding(inlineSize);
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
        "pointer-events-none z-10 inline-flex items-center text-interactive-secondary transition group-has-[>:is(input,button,select):focus-visible]/input:!text-interactive-primary group-has-[>:is(input,button,select):hover]/input:text-interactive-secondary-hover",
        placement === "start" && "justify-self-start",
        placement === "end" && "justify-self-end",
        interactive
          ? "*:pointer-events-auto"
          : "group-disabled/input:opacity-45 group-disabled/input:mix-blend-luminosity",
        padding === "sm" && "px-2",
        padding === "md" &&
          clsx(
            "px-4",
            placement === "start" && "pe-2",
            placement === "end" && "ps-2",
          ),
      )}
    >
      {content}
    </span>
  );
}
