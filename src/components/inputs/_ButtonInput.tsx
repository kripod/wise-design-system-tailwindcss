import { clsx } from "clsx/lite";
import { forwardRef, useContext } from "react";

import { FieldContext } from "../../contexts/FieldContext";
import { inputClassNameBase } from "./_Input";
import { useInputPaddings } from "./InputGroup";

export interface ButtonInputProps
  extends React.ComponentPropsWithRef<"button"> {
  size?: "sm" | "md" | "lg";
}

export const ButtonInput = forwardRef(function ButtonInput(
  { size = "md", className, style, ...restProps }: ButtonInputProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const attributes = useContext(FieldContext);
  const inputPaddings = useInputPaddings();

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        className,
        inputClassNameBase({ size }),
        "inline-grid auto-cols-fr content-center rounded text-start",
      )}
      style={{ ...inputPaddings, ...style }}
      {...attributes}
      {...restProps}
    />
  );
});
