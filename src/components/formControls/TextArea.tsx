import { clsx } from "clsx";
import * as React from "react";

import {
  formControlClassNameBase,
  useFormControlAriaAttributes,
} from "./_FormControl";

export type TextAreaProps = Pick<
  React.ComponentPropsWithRef<"textarea">,
  | "ref"
  | "name"
  | "autoComplete"
  | "defaultValue"
  | "value"
  | "required"
  | "minLength"
  | "maxLength"
  | "aria-invalid"
  | "readOnly"
  | "disabled"
  | "rows"
  | "onChange"
  | "onInvalid"
  | "onSelect"
>;

export const TextArea = React.forwardRef(function TextArea(
  { ...restProps }: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const formControlAriaAttributes = useFormControlAriaAttributes();

  return (
    <textarea
      ref={ref}
      {...formControlAriaAttributes}
      className={clsx(
        formControlClassNameBase(),
        "min-h-18 scroll-py-2 overscroll-none rounded py-3 text-base placeholder:text-content-tertiary",
      )}
      {...restProps}
    />
  );
});
