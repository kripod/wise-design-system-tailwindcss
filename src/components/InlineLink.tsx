import { clsx } from "clsx/lite";

import type { Merge } from "../utils/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InlineLinkElementType = React.ElementType<any, "a" | "button" | "span">;

export type InlineLinkProps<T extends InlineLinkElementType = "a"> = Merge<
  React.ComponentPropsWithoutRef<T> & { as?: never },
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
        typeof className === "string" ? className : undefined,
        "font-semibold text-content-link underline underline-offset-2 hover:text-content-link-hover active:text-content-link-active",
      )}
      {...restProps}
    />
  );
}
