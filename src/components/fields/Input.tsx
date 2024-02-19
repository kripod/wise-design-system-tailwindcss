import { clsx } from "clsx";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { useResizeObserver } from "../../hooks/useResizeObserver";
import {
  fieldControlClassNameBase,
  fieldDescribedByAtom,
  fieldInvalidAtom,
} from "./Field";

export const inputPaddingInlineStartAtom = atom<number | undefined>(undefined);
export const inputPaddingInlineEndAtom = atom<number | undefined>(undefined);

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

  const paddingInlineStart = useAtomValue(inputPaddingInlineStartAtom);
  const paddingInlineEnd = useAtomValue(inputPaddingInlineEndAtom);

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
        paddingInlineStart,
        paddingInlineEnd,
      }}
      {...restProps}
    />
  );
});

export type InputGroupProps = {
  children?: React.ReactNode;
};

export function InputGroup({ children }: InputGroupProps) {
  return (
    <Provider>
      <span className="group/input inline-grid [&>*]:col-start-1 [&>*]:row-start-1">
        {children}
      </span>
    </Provider>
  );
}

export type InputAddonProps = {
  interactive?: boolean;
  margin?: "none" | "sm" | "md";
  children?: React.ReactNode;
};

export function InputAddon({
  interactive = false,
  margin = "md",
  children,
}: InputAddonProps) {
  const setInputPaddingInlineStart = useSetAtom(inputPaddingInlineStartAtom);
  const setInputPaddingInlineEnd = useSetAtom(inputPaddingInlineEndAtom);
  const setInputPadding = !interactive
    ? setInputPaddingInlineStart
    : setInputPaddingInlineEnd;

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
        "pointer-events-none z-10 self-center text-interactive-secondary transition group-[:has(>input:focus:enabled:enabled)]/input:text-interactive-primary group-[:has(>input:hover:enabled)]/input:text-interactive-secondary-hover group-[:has(>input:disabled)]/input:opacity-45 group-[:has(>input:disabled)]/input:mix-blend-luminosity",
        !interactive
          ? "justify-self-start"
          : "justify-self-end [&>*]:pointer-events-auto",
        {
          "px-2": margin === "sm",
          [clsx("px-4", !interactive ? "pe-2" : "ps-2")]: margin === "md",
        },
      )}
    >
      {children}
    </span>
  );
}
