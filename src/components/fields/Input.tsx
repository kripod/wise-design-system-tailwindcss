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

export type InputGroupProps = (
  | {
      prefix: React.ReactNode;
      prefixWidth: React.CSSProperties["paddingInlineStart"];
    }
  | {
      prefix?: never;
      prefixWidth?: never;
    }
) & {
  children?: React.ReactNode;
};

export function InputGroup({ prefix, prefixWidth, children }: InputGroupProps) {
  return (
    <InputGroupContext.Provider
      value={React.useMemo(() => ({ prefixWidth }), [prefixWidth])}
    >
      <span className="inline-grid [&>*]:col-start-1 [&>*]:row-start-1">
        <span className="pointer-events-none z-10 inline-flex items-center justify-self-start">
          {prefix}
        </span>
        {children}
      </span>
    </InputGroupContext.Provider>
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
