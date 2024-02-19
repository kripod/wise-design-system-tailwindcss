import { clsx } from "clsx";
import * as React from "react";

import { fieldControlClassNameBase, useFieldDescribedBy } from "./Field";

export type TextAreaProps = Pick<
  React.ComponentPropsWithRef<"textarea">,
  | "ref"
  | "name"
  | "defaultValue"
  | "value"
  | "required"
  | "minLength"
  | "maxLength"
  | "autoComplete"
  | "readOnly"
  | "disabled"
  | "rows"
  | "onChange"
  | "onInvalid"
  | "onSelect"
> & {
  "aria-invalid"?: boolean;
};

export const TextArea = React.forwardRef(function TextArea(
  { ...restProps }: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const fieldDescribedBy = useFieldDescribedBy();

  return (
    <textarea
      ref={ref}
      aria-describedby={fieldDescribedBy}
      className={clsx(
        fieldControlClassNameBase(),
        "min-h-18 scroll-py-2 overscroll-none rounded placeholder:text-content-tertiary",
      )}
      {...restProps}
    />
  );
});
