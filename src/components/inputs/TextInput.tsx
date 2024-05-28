import { clsx } from "clsx/lite";
import { forwardRef, useContext } from "react";

import { FieldContext } from "../../contexts/FieldContext";
import { inputClassNameBase } from "./_Input";
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
  size?: "sm" | "md" | "lg";
  shape?: "rectangle" | "pill";
}

export const TextInput = forwardRef(function TextInput(
  { size = "md", shape = "rectangle", className, ...restProps }: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const attributes = useContext(FieldContext);
  const inputPaddings = useInputPaddings();

  return (
    <input
      ref={ref}
      className={clsx(
        className,
        inputClassNameBase({ size }),
        "placeholder:text-content-tertiary",
        shape === "rectangle" && "rounded",
        shape === "pill" && "rounded-full",
      )}
      style={inputPaddings}
      {...attributes}
      {...restProps}
    />
  );
});
