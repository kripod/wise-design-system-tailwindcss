import { clsx } from "clsx";
import * as React from "react";

import { useResizeObserver } from "../../hooks/useResizeObserver";
import { pxToRem } from "../../pxToRem";

const InputPaddingStartContext = React.createContext<
  [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]
>([undefined, () => {}]);

const InputPaddingEndContext = React.createContext<
  [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]
>([undefined, () => {}]);

export function useInputPaddings() {
  const [paddingStart] = React.useContext(InputPaddingStartContext);
  const [paddingEnd] = React.useContext(InputPaddingEndContext);

  return {
    paddingInlineStart:
      paddingStart != null ? pxToRem(paddingStart) : undefined,
    paddingInlineEnd: paddingEnd != null ? pxToRem(paddingEnd) : undefined,
  } satisfies React.CSSProperties;
}

export interface InputGroupProps {
  addonStart?: React.ReactNode;
  addonEnd?: React.ReactNode;
  addonPadding?: InputAddonProps["padding"];
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function InputGroup({
  addonStart,
  addonEnd,
  addonPadding = "md",
  disabled,
  className,
  children,
}: InputGroupProps) {
  const [paddingStart, setPaddingStart] = React.useState<number>();
  const [paddingEnd, setPaddingEnd] = React.useState<number>();

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
          )}
        >
          {addonStart != null ? (
            <InputAddon placement="start" padding={addonPadding}>
              {addonStart}
            </InputAddon>
          ) : null}
          {children}
          {addonEnd != null ? (
            <InputAddon placement="end" padding={addonPadding}>
              {addonEnd}
            </InputAddon>
          ) : null}
        </fieldset>
      </InputPaddingEndContext.Provider>
    </InputPaddingStartContext.Provider>
  );
}

interface InputAddonProps {
  placement: "start" | "end";
  padding: "none" | "sm" | "md";
  children?: React.ReactNode;
}

function InputAddon({ placement, padding, children }: InputAddonProps) {
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
        "z-10 inline-flex items-center text-interactive-secondary transition group-[:has(>:is(input,select):focus)]/input:!text-interactive-primary group-[:has(>:is(input,select):hover)]/input:text-interactive-secondary-hover",
        {
          "justify-self-start": placement === "start",
          "justify-self-end": placement === "end",
        },
        {
          "px-2": padding === "sm",
          [clsx("px-4", {
            "pe-2": placement === "start",
            "ps-2": placement === "end",
          })]: padding === "md",
        },
      )}
    >
      {children}
    </span>
  );
}
