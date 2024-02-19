import * as React from "react";

import { useWrappedCallback } from "./useWrappedCallback";

export function useResizeObserver(
  ref: React.RefObject<Element>,
  callback: (entry: ResizeObserverEntry) => void,
) {
  const wrappedCallback = useWrappedCallback(callback);
  React.useEffect(() => {
    if (ref.current != null) {
      const resizeObserver = new ResizeObserver(([entry]) => {
        wrappedCallback(entry);
      });
      resizeObserver.observe(ref.current, { box: "border-box" });
      return () => {
        resizeObserver.disconnect();
      };
    }
    return () => {};
  }, [ref, wrappedCallback]);
}
