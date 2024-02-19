import clsx from "clsx";
import * as React from "react";

export type InputProps = React.ComponentPropsWithRef<"input"> & {
  label: string;
};

export const Input = React.forwardRef(function Input({
  label,
  required = false,
  className,
  ...restProps
}: InputProps) {
  return (
    <div>
      <label className="space-y-1">
        <div className="space-x-1 text-sm">
          <span className="text-content-secondary">{label}</span>
          {!required ? (
            <span className="text-content-tertiary">(Optional)</span>
          ) : null}
        </div>

        <input
          required={required}
          className={clsx(
            "h-12 rounded border border-interactive-secondary px-4 text-base text-content-primary",
            className,
          )}
          {...restProps}
        />
      </label>
    </div>
  );
});
