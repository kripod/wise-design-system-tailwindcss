import { clsx } from "clsx";
import { useAtomValue } from "jotai";
import * as React from "react";

import {
  fieldControlClassNameBase,
  fieldDescribedByAtom,
  fieldInvalidAtom,
} from "./Field";

export type TextAreaProps = React.ComponentPropsWithRef<"textarea">;

export const TextArea = React.forwardRef(function TextArea(
  { className, ...restProps }: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const fieldDescribedBy = useAtomValue(fieldDescribedByAtom);
  const fieldInvalid = useAtomValue(fieldInvalidAtom);

  return (
    <textarea
      ref={ref}
      aria-describedby={fieldDescribedBy}
      aria-invalid={fieldInvalid}
      className={clsx(
        fieldControlClassNameBase(),
        "min-h-18 scroll-py-2 overscroll-none rounded",
        className,
      )}
      {...restProps}
    />
  );
});
