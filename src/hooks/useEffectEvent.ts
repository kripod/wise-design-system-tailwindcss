import * as React from "react";

/*
 * Inspired by:
 *
 * - https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event
 * - https://legacy.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 */

export function useEffectEvent<A extends unknown[], R>(
  callback: (...args: A) => R,
): typeof callback {
  const ref = React.useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  React.useEffect(() => {
    ref.current = callback;
  });

  return React.useCallback((...args) => ref.current(...args), []);
}
