import * as React from "react";

export function useMedia(query: string) {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
      };
    },
    () => window.matchMedia(query).matches,
  );
}
