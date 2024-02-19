import { clsx } from "clsx";
import * as React from "react";

import { useResizeObserver } from "../../hooks/useResizeObserver";
import {
  formControlClassNameBase,
  useFormControlAriaAttributes,
} from "./_FormControl";

type TextInputPaddingStartContextType = [
  React.CSSProperties["paddingInlineStart"],
  React.Dispatch<
    React.SetStateAction<React.CSSProperties["paddingInlineStart"]>
  >,
];

const TextInputPaddingStartContext =
  React.createContext<TextInputPaddingStartContextType>([undefined, () => {}]);

type TextInputPaddingEndContextType = [
  React.CSSProperties["paddingInlineEnd"],
  React.Dispatch<React.SetStateAction<React.CSSProperties["paddingInlineEnd"]>>,
];

const TextInputPaddingEndContext =
  React.createContext<TextInputPaddingEndContextType>([undefined, () => {}]);

export interface TextInputGroupProps {
  initialPaddingStart?: TextInputPaddingStartContextType[0];
  initialPaddingEnd?: TextInputPaddingEndContextType[0];
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function TextInputGroup({
  initialPaddingStart,
  initialPaddingEnd,
  disabled,
  className,
  children,
}: TextInputGroupProps) {
  const [paddingStart, setPaddingStart] = React.useState(initialPaddingStart);
  const [paddingEnd, setPaddingEnd] = React.useState(initialPaddingEnd);

  return (
    <TextInputPaddingStartContext.Provider
      value={React.useMemo(
        () => [paddingStart, setPaddingStart],
        [paddingStart],
      )}
    >
      <TextInputPaddingEndContext.Provider
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
      </TextInputPaddingEndContext.Provider>
    </TextInputPaddingStartContext.Provider>
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
    | "onInvalid"
    | "onSelect"
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

  const [paddingStart] = React.useContext(TextInputPaddingStartContext);
  const [paddingEnd] = React.useContext(TextInputPaddingEndContext);

  return (
    <input
      ref={ref}
      {...formControlAriaAttributes}
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
      {...restProps}
    />
  );
});

export interface TextInputAddonProps {
  placement: "start" | "end";
  interactive?: boolean;
  padding?: "none" | "sm" | "md";
  children?: React.ReactNode;
}

export function TextInputAddon({
  placement,
  interactive,
  padding = "md",
  children,
}: TextInputAddonProps) {
  const [, setTextInputPadding] = React.useContext(
    placement === "start"
      ? TextInputPaddingStartContext
      : TextInputPaddingEndContext,
  );

  const ref = React.useRef<HTMLSpanElement>(null);
  useResizeObserver(ref, (entry) => {
    // TODO: Remove condition once most browsers support `borderBoxSize`
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (entry.borderBoxSize != null) {
      setTextInputPadding(entry.borderBoxSize[0].inlineSize);
    }
  });

  return (
    <span
      ref={ref}
      className={clsx(
        "pointer-events-none self-center text-interactive-secondary transition group-[:has(>input:focus)]/input:!text-interactive-primary group-[:has(>input:hover)]/input:text-interactive-secondary-hover",
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
