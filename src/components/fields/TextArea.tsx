import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { fieldControlClassNameBase, useFieldDescribedBy } from "./Field";

export type TextAreaProps = Merge<
  Pick<
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
    | "className"
    | "onChange"
    | "onInvalid"
    | "onSelect"
  >,
  {
    "aria-invalid"?: boolean;
  }
>;

export const TextArea = React.forwardRef(function TextArea(
  { className, ...restProps }: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const fieldDescribedBy = useFieldDescribedBy();

  return (
    <textarea
      ref={ref}
      aria-describedby={fieldDescribedBy}
      className={clsx(
        fieldControlClassNameBase(),
        "min-h-18 scroll-py-2 overscroll-none rounded",
        className,
      )}
      {...restProps}
    />
  );
});
