import { clsx } from "clsx";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { useResizeObserver } from "../../hooks/useResizeObserver";
import { HydrateAtoms } from "../../jotai-utils";
import {
  fieldControlClassNameBase,
  fieldDescribedByAtom,
  fieldInvalidAtom,
} from "./Field";

const inputPaddingStartAtom =
  atom<React.CSSProperties["paddingInlineStart"]>(undefined);
const inputPaddingEndAtom =
  atom<React.CSSProperties["paddingInlineEnd"]>(undefined);

export type InputProps = Merge<
  Pick<
    React.ComponentPropsWithRef<"input">,
    | "ref"
    | "inputMode"
    | "name"
    | "defaultValue"
    | "value"
    | "required"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "autoComplete"
    | "readOnly"
    | "disabled"
    | "className"
    | "onChange"
    | "onInvalid"
    | "onSelect"
  >,
  {
    type?: "email" | "password" | "tel" | "text" | "url";
    size?: "sm" | "md" | "lg" | "xl";
    shape?: "rectangle" | "pill";
  }
>;

export const Input = React.forwardRef(function Input(
  { size = "md", shape = "rectangle", className, ...restProps }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const fieldDescribedBy = useAtomValue(fieldDescribedByAtom);
  const fieldInvalid = useAtomValue(fieldInvalidAtom);

  const inputPaddingStart = useAtomValue(inputPaddingStartAtom);
  const inputPaddingEnd = useAtomValue(inputPaddingEndAtom);

  return (
    <input
      ref={ref}
      aria-describedby={fieldDescribedBy}
      aria-invalid={fieldInvalid}
      className={clsx(
        fieldControlClassNameBase({ size }),
        {
          rounded: shape === "rectangle",
          "rounded-full": shape === "pill",
        },
        className,
      )}
      style={{
        paddingInlineStart: inputPaddingStart,
        paddingInlineEnd: inputPaddingEnd,
      }}
      {...restProps}
    />
  );
});

export type InputGroupProps = {
  initialPaddingStart?: React.CSSProperties["paddingInlineStart"];
  initialPaddingEnd?: React.CSSProperties["paddingInlineEnd"];
  disabled?: boolean;
  children?: React.ReactNode;
};

export function InputGroup({
  initialPaddingStart,
  initialPaddingEnd,
  disabled = false,
  children,
}: InputGroupProps) {
  return (
    <Provider>
      <HydrateAtoms
        initialValues={[
          [inputPaddingStartAtom, initialPaddingStart],
          [inputPaddingEndAtom, initialPaddingEnd],
        ]}
      >
        <fieldset
          disabled={disabled}
          className="group/input inline-grid [&>*]:col-start-1 [&>*]:row-start-1"
        >
          {children}
        </fieldset>
      </HydrateAtoms>
    </Provider>
  );
}

export type InputAddonProps = {
  placement: "start" | "end";
  interactive?: boolean;
  padding?: "none" | "sm" | "md";
  children?: React.ReactNode;
};

export function InputAddon({
  placement,
  interactive = false,
  padding = "md",
  children,
}: InputAddonProps) {
  const setInputPaddingStart = useSetAtom(inputPaddingStartAtom);
  const setInputPaddingEnd = useSetAtom(inputPaddingEndAtom);
  const setInputPadding =
    placement === "start" ? setInputPaddingStart : setInputPaddingEnd;

  const ref = React.useRef<HTMLSpanElement>(null);
  useResizeObserver(ref, (entry) => {
    // TODO: Remove condition once most browsers support `borderBoxSize`
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (entry.borderBoxSize != null) {
      setInputPadding(entry.borderBoxSize[0].inlineSize);
    }
  });

  return (
    <span
      ref={ref}
      className={clsx(
        "pointer-events-none z-10 self-center text-interactive-secondary transition group-disabled/input:mix-blend-luminosity group-[:has(>input:focus:enabled:enabled)]/input:text-interactive-primary group-[:has(>input:hover:enabled)]/input:text-interactive-secondary-hover",
        {
          "justify-self-start": placement === "start",
          "justify-self-end": placement === "end",
        },
        interactive && "[&>*]:pointer-events-auto",
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
