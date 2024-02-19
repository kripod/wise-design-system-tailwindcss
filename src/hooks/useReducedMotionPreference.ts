import { useMedia } from "./useMedia";

export function useReducedMotionPreference() {
  return useMedia("(prefers-reduced-motion: reduce)");
}
