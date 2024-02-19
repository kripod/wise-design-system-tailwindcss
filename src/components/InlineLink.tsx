import { clsx } from "clsx";

export interface InlineLinkProps extends React.ComponentPropsWithoutRef<"a"> {}

export function InlineLink({
  target,
  rel,
  className,
  children,
  ...restProps
}: InlineLinkProps) {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      target={target}
      rel={target === "_blank" ? "noreferrer" : rel}
      className={clsx(
        className,
        "font-semibold text-content-link underline hover:text-content-link-hover active:text-content-link-active",
      )}
      {...restProps}
    >
      {children}
    </a>
  );
}
