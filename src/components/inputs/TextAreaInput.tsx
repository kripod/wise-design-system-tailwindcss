import { clsx } from "clsx/lite";
import { forwardRef, useContext } from "react";

import { FieldContext } from "../../contexts/FieldContext";
import { inputClassNameBase } from "./_Input";

export interface TextAreaInputProps
  extends Pick<
    React.ComponentPropsWithRef<"textarea">,
    | "ref"
    | "name"
    | "autoComplete"
    | "defaultValue"
    | "value"
    | "required"
    | "minLength"
    | "maxLength"
    | "readOnly"
    | "disabled"
    | "rows"
    | "className"
    | "onChange"
    | "onBlur"
  > {}

export const TextAreaInput = forwardRef(function TextAreaInput(
  { className, ...restProps }: TextAreaInputProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const attributes = useContext(FieldContext);

  return (
    <textarea
      ref={ref}
      className={clsx(
        className,
        inputClassNameBase(),
        "min-h-18 scroll-py-2 overscroll-none rounded py-3 text-body-lg placeholder:text-content-tertiary",
      )}
      {...attributes}
      {...restProps}
    />
  );
});
