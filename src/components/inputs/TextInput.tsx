import { clsx } from "clsx";
import * as React from "react";

import { inputClassNameBase } from "./_Input";
import { useInputAriaAttributes } from "./Field";
import { useInputPaddings } from "./InputGroup";

export interface TextInputProps
  extends Pick<
    React.ComponentPropsWithRef<"input">,
    | "ref"
    | "role"
    | "name"
    | "inputMode"
    | "autoComplete"
    | "defaultValue"
    | "value"
    | "required"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "readOnly"
    | "disabled"
    | "className"
    | "onChange"
    | "onBlur"
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
        "placeholder:text-content-tertiary",
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
