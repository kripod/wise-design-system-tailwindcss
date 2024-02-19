import { clsx } from "clsx";

export type LabelProps = {
  className?: string;
  children?: React.ReactNode;
};

export function Label({ className, children }: LabelProps) {
  return (
    <label
      className={clsx(
        className,
        "inline-flex flex-col gap-y-1 text-sm text-content-secondary",
      )}
    >
      {children}
    </label>
  );
}
