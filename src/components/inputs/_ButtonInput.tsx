import { clsx } from "clsx/lite";
import { forwardRef, useContext } from "react";

import { FieldContext } from "../../contexts/FieldContext";
import { InputGroupContext } from "../../contexts/InputGroupContext";
import { inputClassNameBase } from "./_Input";

export interface ButtonInputProps
  extends React.ComponentPropsWithRef<"button"> {
  size?: "sm" | "md" | "lg";
}

export const ButtonInput = forwardRef(function ButtonInput(
  { size = "md", className, style, ...restProps }: ButtonInputProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const attributes = useContext(FieldContext);
  const [groupInputStyle] = useContext(InputGroupContext);

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        className,
        inputClassNameBase({ size }),
        "inline-grid auto-cols-fr content-center rounded text-start",
      )}
      style={{ ...groupInputStyle, ...style }}
      {...attributes}
      {...restProps}
    />
  );
});
