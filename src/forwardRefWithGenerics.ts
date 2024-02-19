import * as React from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export const forwardRefWithGenerics = React.forwardRef as <T, P = {}>(
  render: (
    props: P,
    ref: React.ForwardedRef<T>,
  ) => ReturnType<React.FunctionComponent>,
) => (
  props: React.PropsWithoutRef<P> & React.RefAttributes<T>,
) => ReturnType<React.FunctionComponent>;
