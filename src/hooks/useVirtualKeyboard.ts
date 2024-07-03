import { useEffect } from "react";

export function useVirtualKeyboard() {
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access, functional/immutable-data */
    if ("virtualKeyboard" in navigator) {
      (navigator.virtualKeyboard as any).overlaysContent = true;
    }
    return () => {
      if ("virtualKeyboard" in navigator) {
        (navigator.virtualKeyboard as any).overlaysContent = false;
      }
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access, functional/immutable-data */
  }, []);
}
