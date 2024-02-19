import { clsx } from "clsx";
import * as React from "react";

import { inputClassNameBase } from "./_Input";
import { useInputAriaAttributes } from "./Field";

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

export const TextAreaInput = React.forwardRef(function TextAreaInput(
  { className, ...restProps }: TextAreaInputProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const inputAriaAttributes = useInputAriaAttributes();

  return (
    <textarea
      ref={ref}
      className={clsx(
        className,
        inputClassNameBase(),
        "min-h-18 scroll-py-2 overscroll-none rounded py-3 text-base placeholder:text-content-tertiary",
      )}
      {...inputAriaAttributes}
      {...restProps}
    />
  );
});
