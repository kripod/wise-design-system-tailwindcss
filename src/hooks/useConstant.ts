import * as React from "react";

export function useConstant<T>(factory: () => T): T {
  const ref = React.useRef<T>();

  const initialized = React.useRef(false);
  if (!initialized.current) {
    ref.current = factory();
    initialized.current = true;
  }

  return ref.current as T;
}
