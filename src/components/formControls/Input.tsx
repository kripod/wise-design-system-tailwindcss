import { clsx } from "clsx";
import * as React from "react";

import { useResizeObserver } from "../../hooks/useResizeObserver";
import {
  formControlClassNameBase,
  useFormControlAriaAttributes,
} from "./_FormControl";

type InputPaddingStartContextType = [
  React.CSSProperties["paddingInlineStart"],
  React.Dispatch<
    React.SetStateAction<React.CSSProperties["paddingInlineStart"]>
  >,
];

const InputPaddingStartContext =
  React.createContext<InputPaddingStartContextType>([undefined, () => {}]);

type InputPaddingEndContextType = [
  React.CSSProperties["paddingInlineEnd"],
  React.Dispatch<React.SetStateAction<React.CSSProperties["paddingInlineEnd"]>>,
];

const InputPaddingEndContext = React.createContext<InputPaddingEndContextType>([
  undefined,
  () => {},
]);

export type InputGroupProps = {
  initialPaddingStart?: InputPaddingStartContextType[0];
  initialPaddingEnd?: InputPaddingEndContextType[0];
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function InputGroup({
  initialPaddingStart,
  initialPaddingEnd,
  disabled,
  className,
  children,
}: InputGroupProps) {
  const [paddingStart, setPaddingStart] = React.useState(initialPaddingStart);
  const [paddingEnd, setPaddingEnd] = React.useState(initialPaddingEnd);

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
            "group/input inline-grid [&>*]:col-start-1 [&>*]:row-start-1",
            className,
          )}
        >
          {children}
        </fieldset>
      </InputPaddingEndContext.Provider>
    </InputPaddingStartContext.Provider>
  );
}

export type InputProps = Pick<
  React.ComponentPropsWithRef<"input">,
  | "ref"
  | "inputMode"
  | "name"
  | "autoComplete"
  | "defaultValue"
  | "value"
  | "required"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "aria-invalid"
  | "readOnly"
  | "disabled"
  | "className"
  | "onChange"
  | "onInvalid"
  | "onSelect"
> & {
  type?: "email" | "password" | "tel" | "text" | "url";
  size?: "sm" | "md" | "xl";
  shape?: "rectangle" | "pill";
};

export const Input = React.forwardRef(function Input(
  { size = "md", shape = "rectangle", className, ...restProps }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const formControlAriaAttributes = useFormControlAriaAttributes();

  const [inputPaddingStart] = React.useContext(InputPaddingStartContext);
  const [inputPaddingEnd] = React.useContext(InputPaddingEndContext);

  return (
    <input
      ref={ref}
      {...formControlAriaAttributes}
      className={clsx(
        formControlClassNameBase({ size }),
        "placeholder:text-content-tertiary enabled:group-hover/input:[&:not(:focus)]:ring-2 enabled:group-hover/input:[&:not(:focus)]:ring-interactive-secondary-hover",
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

export type InputAddonProps = {
  placement: "start" | "end";
  interactive?: boolean;
  padding?: "none" | "sm" | "md";
  children?: React.ReactNode;
};

export function InputAddon({
  placement,
  interactive,
  padding = "md",
  children,
}: InputAddonProps) {
  const [, setInputPadding] = React.useContext(
    placement === "start" ? InputPaddingStartContext : InputPaddingEndContext,
  );

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
        "pointer-events-none relative self-center text-interactive-secondary transition group-[:has(>input:focus:enabled:enabled)]/input:text-interactive-primary group-[:has(>input:hover:enabled)]/input:text-interactive-secondary-hover",
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
      {interactive ? (
        <span className="pointer-events-auto">{children}</span>
      ) : (
        children
      )}
    </span>
  );
}
