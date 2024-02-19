import { clsx } from "clsx";
import { useAtomValue } from "jotai";
import * as React from "react";
import type { Merge } from "ts-essentials";

import {
  fieldControlClassNameBase,
  fieldDescribedByAtom,
  fieldInvalidAtom,
} from "./Field";

type InputGroupContextType = {
  prefixWidth?: React.CSSProperties["paddingInlineStart"];
};

const InputGroupContext = React.createContext<InputGroupContextType>({});

export type InputGroupProps = {
  prefixWidth?: React.CSSProperties["paddingInlineStart"];
  children?: React.ReactNode;
};

export function InputGroup({ prefixWidth, children }: InputGroupProps) {
  return (
    <InputGroupContext.Provider
      value={React.useMemo(() => ({ prefixWidth }), [prefixWidth])}
    >
      <span className="group/input inline-grid [&>*]:col-start-1 [&>*]:row-start-1">
        {children}
      </span>
    </InputGroupContext.Provider>
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
  return (
    <span
      className={clsx(
        "z-10 self-center text-interactive-secondary transition group-[:has(>input:focus:enabled:enabled)]/input:text-interactive-primary group-[:has(>input:hover:enabled)]/input:text-interactive-secondary-hover group-[:has(>input:disabled)]/input:opacity-45 group-[:has(>input:disabled)]/input:mix-blend-luminosity",
        interactive
          ? "justify-self-end"
          : "pointer-events-none justify-self-start",
        {
          "mx-4": margin === "md",
          "mx-2": margin === "sm",
        },
      )}
    >
      {children}
    </span>
  );
}

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

  const { prefixWidth } = React.useContext(InputGroupContext);

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
        paddingInlineStart:
          typeof prefixWidth === "number" ? `${prefixWidth}px` : prefixWidth,
      }}
      {...restProps}
    />
  );
});
