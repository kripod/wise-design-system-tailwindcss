import { clsx } from "clsx";

export interface LabelProps {
  htmlFor: string;
  className?: string;
  children?: React.ReactNode;
}

export function Label({ htmlFor, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        className,
        "inline-flex flex-col gap-y-1 text-body text-content-secondary",
      )}
    >
      {children}
    </label>
  );
}
