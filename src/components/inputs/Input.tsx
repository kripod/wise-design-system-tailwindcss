import { clsx } from "clsx";
import { useAtomValue } from "jotai";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { fieldDescribedByAtom, fieldInvalidAtom } from "./Field";

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
  React.ComponentPropsWithRef<"input">,
  {
    size?: "sm" | "md" | "lg" | "xl";
    shape?: "rectangle" | "pill";
  }
>;

export const Input = React.forwardRef(function Input(
  {
    size = "md",
    shape = "rectangle",
    className,
    style,
    ...restProps
  }: InputProps,
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
        "h-12 px-4 text-content-primary ring-1 ring-inset ring-interactive-secondary transition-shadow invalid:ring invalid:!ring-sentiment-negative enabled:hover:ring enabled:hover:ring-interactive-secondary-hover enabled:focus:outline-none enabled:focus:ring-3 enabled:focus:ring-interactive-primary disabled:opacity-45 disabled:mix-blend-luminosity",
        {
          "h-8 text-sm": size === "sm",
          "h-12 text-base": size === "md",
          "h-14 text-base": size === "lg",
          "h-18 text-xl": size === "xl",
        },
        {
          rounded: shape === "rectangle",
          "rounded-full": shape === "pill",
        },
        className,
      )}
      style={{
        ...style,
        paddingInlineStart:
          typeof prefixWidth === "number" ? `${prefixWidth}px` : prefixWidth,
      }}
      {...restProps}
    />
  );
});
