import { useSyncExternalStore } from "react";

export function useMedia(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
      };
    },
    () => window.matchMedia(query).matches,
    () => undefined,
  );
}
