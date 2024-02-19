import { clsx } from "clsx";
import * as React from "react";

import { inputClassNameBase, useInputAriaAttributes } from "./_Input";
import { useInputPaddings } from "./InputAddon";

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
  const inputAriaAttributes = useInputAriaAttributes();
  const inputPaddings = useInputPaddings();

  return (
    <input
      ref={ref}
      className={clsx(
        className,
        inputClassNameBase({ size }),
        "placeholder:text-content-tertiary enabled:group-hover/input:ring-2 enabled:group-hover/input:ring-interactive-secondary-hover",
        {
          rounded: shape === "rectangle",
          "rounded-full": shape === "pill",
        },
      )}
      style={inputPaddings}
      {...inputAriaAttributes}
      {...restProps}
    />
  );
});
