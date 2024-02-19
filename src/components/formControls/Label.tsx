export type LabelProps = {
  children?: React.ReactNode;
};

export function Label({ children }: LabelProps) {
  return (
    <label className="inline-flex flex-col gap-y-1 text-sm text-content-secondary">
      {children}
    </label>
  );
}
