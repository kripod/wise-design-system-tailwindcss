import * as React from "react";

import { useEventCallback } from "./useEventCallback";

export function useResizeObserver(
  ref: React.RefObject<Element>,
  callback: ResizeObserverCallback,
) {
  const eventCallback = useEventCallback(callback);
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(eventCallback);
    if (ref.current != null) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [eventCallback, ref]);
}
