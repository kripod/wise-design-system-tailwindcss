import "./styles.css";
import "focus-visible";

import { GlobalProvider, ThemeState } from "@ladle/react";
import * as React from "react";

import { useMedia } from "../src/hooks/useMedia";

export const Provider: GlobalProvider = function ({ globalState, children }) {
  const prefersDarkTheme = useMedia("(prefers-color-scheme: dark)");
  const theme = React.useMemo<"light" | "dark">(() => {
    if (globalState.theme !== ThemeState.Auto) {
      return globalState.theme;
    }
    return prefersDarkTheme ? "dark" : "light";
  }, [globalState.theme, prefersDarkTheme]);

  return (
    <div className={theme === "dark" ? "dark" : undefined}>{children}</div>
  );
};
