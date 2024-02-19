import { clsx } from "clsx";
import * as React from "react";
import type { Merge } from "ts-essentials";

import { Spinner } from "../Spinner";

export type ButtonPropsBase = Pick<
  React.ComponentPropsWithRef<"button">,
  "ref" | "type" | "aria-describedby" | "className" | "children" | "onClick"
> & {
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
};

export type ButtonProps = Merge<
  React.ComponentPropsWithRef<"button">,
  ButtonPropsBase & {
    size?: "auto" | "sm" | "md" | "lg";
    equilateral?: boolean;
  }
>;

export const Button = React.forwardRef(function Button(
  {
    size = "auto",
    equilateral,
    disabled,
    className,
    children,
    render,
    ...restProps
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <>
      {(render ?? ((props) => <button ref={ref} type="button" {...props} />))({
        disabled: Boolean(disabled),
        className: clsx(
          "transition focus-visible:outline-offset focus-visible:outline disabled:pointer-events-none disabled:opacity-45 disabled:mix-blend-luminosity aria-disabled:pointer-events-none aria-disabled:opacity-45 aria-disabled:mix-blend-luminosity",
          size !== "auto" && "inline-flex items-center justify-center gap-x-2",
          {
            [clsx("h-8 text-sm font-semibold", equilateral && "w-8")]:
              size === "sm",
            [clsx("h-12 text-base font-semibold", equilateral && "w-12")]:
              size === "md",
            [clsx("h-14 text-base font-semibold", equilateral && "w-14")]:
              size === "lg",
          },
          className,
        ),
        children: (
          <>
            {children} {disabled === "loading" ? <Spinner /> : null}
          </>
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
