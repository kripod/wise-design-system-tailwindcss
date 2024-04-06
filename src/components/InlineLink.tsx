import { clsx } from "clsx/lite";

import type { Assign } from "../utils/types";

interface InlineLinkElementProps {
  className?: string;
}

type InlineLinkElementType = React.ElementType<
  InlineLinkElementProps,
  "a" | "button" | "span"
>;

export type InlineLinkProps<T extends InlineLinkElementType = "a"> = Assign<
  React.ComponentPropsWithoutRef<T>,
  { as?: T }
>;

export function InlineLink<T extends InlineLinkElementType = "a">({
  as = "a" as T,
  className,
  ...restProps
}: InlineLinkProps<T>) {
  const Element: InlineLinkElementType = as;
  return (
    <Element
      className={clsx(
        className,
        "font-semibold text-content-link underline underline-offset-2 hover:text-content-link-hover active:text-content-link-active",
      )}
      {...restProps}
    />
  );
}
