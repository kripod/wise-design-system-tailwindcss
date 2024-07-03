import { useEffect } from "react";

export function useVirtualKeyboard() {
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access, functional/immutable-data */
    if ("virtualKeyboard" in navigator) {
      const virtualKeyboard: any = navigator.virtualKeyboard;
      const initialOverlaysContent: unknown = virtualKeyboard.overlaysContent;
      virtualKeyboard.overlaysContent = true;
      return () => {
        virtualKeyboard.overlaysContent = initialOverlaysContent;
      };
    }
    /* eslint-enable @typescript-eslint/no-unsafe-member-access, functional/immutable-data */
  }, []);
}
