import { clsx } from "clsx/lite";
import { forwardRef } from "react";

import { inputClassNameBase } from "./_Input";
import { useInputAttributes } from "./Field";
import { useInputPaddings } from "./InputGroup";

export interface ButtonInputProps
  extends React.ComponentPropsWithRef<"button"> {
  size?: "sm" | "md" | "lg";
}

export const ButtonInput = forwardRef(function ButtonInput(
  { size = "md", className, style, ...restProps }: ButtonInputProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const inputAttributes = useInputAttributes();
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
      {...inputAttributes}
      {...restProps}
    />
  );
});
