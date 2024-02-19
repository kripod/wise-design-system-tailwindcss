import "./styles.css";

import { type GlobalProvider, ThemeState } from "@ladle/react";
import { clsx } from "clsx";
import * as React from "react";

export const Provider: GlobalProvider = function ({ globalState, children }) {
  const themeClassName = clsx(
    globalState.theme === ThemeState.Dark && "theme-dark",
  );
  React.useEffect(() => {
    if (themeClassName) {
      document.documentElement.classList.add(themeClassName);
      return () => {
        document.documentElement.classList.remove(themeClassName);
      };
    }
    return () => {};
  }, [themeClassName]);

  return <React.StrictMode>{children}</React.StrictMode>;
};
