import * as React from "react";

export function useWrappedCallback<P extends unknown[], R>(
  callback: (...args: P) => R,
): typeof callback {
  /* Inspired by: https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback */
  const ref = React.useRef(callback);
  ref.current = callback;
  return React.useCallback((...args) => ref.current(...args), []);
}
