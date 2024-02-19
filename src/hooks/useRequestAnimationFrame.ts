import * as React from "react";

export function useRequestAnimationFrame(callback: FrameRequestCallback) {
  React.useEffect(() => {
    let handle: number;
    const next = (time: DOMHighResTimeStamp) => {
      callback(time);
      handle = window.requestAnimationFrame(next);
    };
    handle = window.requestAnimationFrame(next);

    return () => {
      window.cancelAnimationFrame(handle);
    };
  }, [callback]);
}
