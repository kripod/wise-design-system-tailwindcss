import "../src/styles.css";
import "focus-visible";

import { GlobalProvider, ThemeState } from "@ladle/react";
import * as React from "react";

import { useColorSchemePreference } from "../src/hooks/useColorSchemePreference";

export const Provider: GlobalProvider = function ({ globalState, children }) {
  const colorSchemePreference = useColorSchemePreference();
  const theme: "light" | "dark" =
    globalState.theme !== ThemeState.Auto
      ? globalState.theme
      : colorSchemePreference;

  return (
    <React.StrictMode>
      <div className={theme === "dark" ? "dark" : undefined}>{children}</div>
    </React.StrictMode>
  );
};
