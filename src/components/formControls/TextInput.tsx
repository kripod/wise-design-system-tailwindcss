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

export interface InputGroupProps {
  initialPaddingStart?: InputPaddingStartContextType[0];
  initialPaddingEnd?: InputPaddingEndContextType[0];
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

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
            className,
            "group/input inline-grid auto-cols-fr [&>*]:col-start-1 [&>*]:row-start-1",
          )}
        >
          {children}
        </fieldset>
      </InputPaddingEndContext.Provider>
    </InputPaddingStartContext.Provider>
  );
}

export interface TextInputProps
  extends Pick<
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
  > {
  type?: "email" | "password" | "tel" | "text" | "url";
  size?: "sm" | "md" | "xl";
  shape?: "rectangle" | "pill";
}

export const TextInput = React.forwardRef(function TextInput(
  { size = "md", shape = "rectangle", className, ...restProps }: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const formControlAriaAttributes = useFormControlAriaAttributes();

  const [paddingStart] = React.useContext(InputPaddingStartContext);
  const [paddingEnd] = React.useContext(InputPaddingEndContext);

  return (
    <input
      ref={ref}
      className={clsx(
        className,
        formControlClassNameBase({ size }),
        "placeholder:text-content-tertiary enabled:group-hover/input:ring-2 enabled:group-hover/input:ring-interactive-secondary-hover",
        {
          rounded: shape === "rectangle",
          "rounded-full": shape === "pill",
        },
      )}
      style={{
        paddingInlineStart: paddingStart,
        paddingInlineEnd: paddingEnd,
      }}
      {...formControlAriaAttributes}
      {...restProps}
    />
  );
});

export interface InputAddonProps {
  placement: "start" | "end";
  interactive?: boolean;
  padding?: "none" | "sm" | "md";
  children?: React.ReactNode;
}

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
        "pointer-events-none self-center text-interactive-secondary",
        {
          "justify-self-start": placement === "start",
          "justify-self-end": placement === "end",
        },
        !interactive &&
          "transition group-[:has(>:is(input,button,select,textarea):focus)]/input:!text-interactive-primary group-[:has(>:is(input,button,select,textarea):hover)]/input:text-interactive-secondary-hover",
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
