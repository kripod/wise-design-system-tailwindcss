import * as React from "react";

/* TODO: Replace `React.ReactElement | null` with `React.ReactNode` when adopting React 18 */

// eslint-disable-next-line @typescript-eslint/ban-types
export const forwardRefWithGenerics = React.forwardRef as <T, P = {}>(
  render: (props: P, ref: React.ForwardedRef<T>) => React.ReactElement | null,
) => (
  props: React.PropsWithoutRef<P> & React.RefAttributes<T>,
) => React.ReactElement | null;
