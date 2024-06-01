import { clsx } from "clsx/lite";
import { forwardRef } from "react";

import { Spinner } from "../Spinner";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithRef<"button">, "disabled"> {
  render?: (props: React.ComponentPropsWithRef<"button">) => React.ReactNode;
  size?: "auto" | "sm" | "md";
  disabled?: boolean | "loading";
}

const defaultRender: ButtonProps["render"] = (props) => (
  <button type="button" {...props} />
);

export const Button = forwardRef(function Button(
  {
    render = defaultRender,
    size = "auto",
    disabled,
    className,
    children,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return render({
    ref,
    disabled: disabled != null ? Boolean(disabled) : disabled,
    className: clsx(
      className,
      "transition focus-visible:outline focus-visible:outline-offset disabled:pointer-events-none disabled:opacity-45 disabled:mix-blend-luminosity aria-disabled:pointer-events-none aria-disabled:opacity-45 aria-disabled:mix-blend-luminosity",
      size !== "auto" &&
        "inline-flex items-center justify-center text-center font-semibold",
      size === "sm" && "h-8 text-body",
      size === "md" && "h-12 text-body-lg",
    ),
    children:
      disabled === "loading" ? (
        <span className="inline-flex items-center justify-center gap-x-2">
          <Spinner size={16} />
          <span className="flex-1">{children}</span>
        </span>
      ) : (
        children
      ),
    ...props,
  });
});
