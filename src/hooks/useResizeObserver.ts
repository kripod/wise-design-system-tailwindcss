import * as React from "react";

import { useEffectEvent } from "./useEffectEvent";

export function useResizeObserver(
  ref: React.RefObject<Element>,
  callback: (entry: ResizeObserverEntry) => void,
) {
  const handleCallback = useEffectEvent(callback);
  React.useEffect(() => {
    if (ref.current != null) {
      const resizeObserver = new ResizeObserver(([entry]) => {
        handleCallback(entry);
      });
      resizeObserver.observe(ref.current, { box: "border-box" });
      return () => {
        resizeObserver.disconnect();
      };
    }
    return () => {};
  }, [handleCallback, ref]);
}
