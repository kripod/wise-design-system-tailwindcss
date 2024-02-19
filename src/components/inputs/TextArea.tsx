import { clsx } from "clsx";
import { useAtomValue } from "jotai";
import * as React from "react";

import { fieldDescribedByAtom, fieldInvalidAtom } from "./Field";

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
        "h-18 min-h-18 scroll-py-2 overscroll-none rounded px-4 py-3 text-base text-content-primary ring-1 ring-inset ring-interactive-secondary transition-shadow invalid:ring invalid:!ring-sentiment-negative enabled:hover:ring enabled:hover:ring-interactive-secondary-hover enabled:focus:outline-none enabled:focus:ring-3 enabled:focus:ring-interactive-primary disabled:opacity-45 disabled:mix-blend-luminosity",
        className,
      )}
      {...restProps}
    />
  );
});
