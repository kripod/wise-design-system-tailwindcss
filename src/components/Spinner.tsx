import { Refresh } from "@transferwise/icons";

export interface SpinnerProps {
  size: 16 | 24;
}

export function Spinner({ size }: SpinnerProps) {
  return (
    // TODO: Change icon
    <Refresh
      size={size}
      className="inline-block animate-spin motion-reduce:animate-none"
    />
  );
}
