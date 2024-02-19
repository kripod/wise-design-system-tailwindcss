import { useSyncExternalStore } from "use-sync-external-store/shim";

export function useMedia(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
      };
    },
    () =>
      typeof window !== "undefined"
        ? window.matchMedia(query).matches
        : undefined,
    () => undefined,
  );
}
