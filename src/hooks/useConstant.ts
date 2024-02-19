import * as React from "react";

export function useConstant<T>(factory: () => T): T {
  const ref = React.useRef<T>();
  if (ref.current === undefined) {
    ref.current = factory();
  }
  return ref.current as T;
}
