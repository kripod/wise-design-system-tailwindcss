import * as React from "react";

import { useWrappedCallback } from "./useWrappedCallback";

export function useResizeObserver(
  ref: React.RefObject<Element>,
  callback: ResizeObserverCallback,
) {
  const wrappedCallback = useWrappedCallback(callback);
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(wrappedCallback);
    if (ref.current != null) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, wrappedCallback]);
}
