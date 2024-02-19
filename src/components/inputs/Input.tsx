import { clsx } from "clsx";
import { useAtomValue } from "jotai";
import * as React from "react";

import { fieldDescribedByAtom, fieldInvalidAtom } from "./Field";

export type InputProps = React.ComponentPropsWithRef<"input">;

export const Input = React.forwardRef(function Input(
  { className, ...restProps }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const fieldDescribedBy = useAtomValue(fieldDescribedByAtom);
  const fieldInvalid = useAtomValue(fieldInvalidAtom);

  return (
    <input
      ref={ref}
      aria-describedby={fieldDescribedBy}
      aria-invalid={fieldInvalid}
      className={clsx(
        "h-12 rounded px-4 text-base text-content-primary ring-1 ring-inset ring-interactive-secondary transition-shadow invalid:ring invalid:!ring-sentiment-negative enabled:hover:ring enabled:hover:ring-interactive-secondary-hover enabled:focus:outline-none enabled:focus:ring-3 enabled:focus:ring-interactive-primary disabled:opacity-45 disabled:mix-blend-luminosity",
        className,
      )}
      {...restProps}
    />
  );
});
