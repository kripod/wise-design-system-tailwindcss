import { useMedia } from "./useMedia";

export function useColorSchemePreference() {
  return useMedia("(prefers-color-scheme: dark)") ? "dark" : "light";
}
