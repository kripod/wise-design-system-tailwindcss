import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { Spinner } from "../Spinner";

export interface ButtonPropsBase
  extends Pick<
    React.ComponentPropsWithRef<"button">,
    "ref" | "type" | "aria-describedby" | "className" | "children" | "onClick"
  > {
  disabled?: boolean | "loading";
  render?: (
    props: React.ComponentPropsWithoutRef<"button"> &
      Required<
        Pick<
          React.ComponentPropsWithoutRef<"button">,
          "disabled" | "className" | "children"
        >
      >,
  ) => React.ReactNode;
}

export interface ButtonProps
  extends Merge<React.ComponentPropsWithRef<"button">, ButtonPropsBase> {
  size?: "auto" | "sm" | "md";
}

export const Button = React.forwardRef(function Button(
  {
    size = "auto",
    disabled,
    className,
    children,
    render = (props) => (
      <button
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        ref={ref}
        type="button"
        {...props}
      />
    ),
    ...restProps
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <>
      {render({
        disabled: Boolean(disabled),
        className: clsx(
          className,
          "transition focus-visible:outline focus-visible:outline-offset disabled:pointer-events-none disabled:opacity-45 disabled:mix-blend-luminosity aria-disabled:pointer-events-none aria-disabled:opacity-45 aria-disabled:mix-blend-luminosity",
          size !== "auto" &&
            "inline-flex items-center justify-center text-center font-semibold",
          {
            "h-8 text-body": size === "sm",
            "h-12 text-body-lg": size === "md",
          },
        ),
        children:
          disabled !== "loading" ? (
            <>{children}</>
          ) : (
            <span className="inline-flex items-center justify-center gap-x-2">
              <Spinner size={16} />
              <span className="flex-1">{children}</span>
            </span>
          ),
        ...restProps,
      })}
    </>
  );
});

export function renderButtonAsLink(
  render: (
    props: React.ComponentPropsWithoutRef<"button"> &
      Required<
        Pick<React.ComponentPropsWithoutRef<"button">, "className" | "children">
      >,
  ) => React.ReactNode,
) {
  return (({ disabled, className, children, ...restProps }) =>
    disabled ? (
      // https://www.scottohara.me/blog/2021/05/28/disabled-links.html
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a role="link" aria-disabled className={className}>
        {children}
      </a>
    ) : (
      render({ disabled, className, children, ...restProps })
    )) satisfies ButtonProps["render"];
}
