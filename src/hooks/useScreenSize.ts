import { minWidthByScreenSize, type ScreenSize } from "../config/screens";
import { useMedia } from "./useMedia";

export function useScreenSize(size: ScreenSize) {
  return useMedia(`(min-width: ${minWidthByScreenSize[size]})`);
}
