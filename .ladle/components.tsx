import "./styles.css";

import { GlobalProvider, ThemeState } from "@ladle/react";
import { clsx } from "clsx";
import * as React from "react";

export const Provider: GlobalProvider = function ({ globalState, children }) {
  const theme: "light" | "dark" =
    globalState.theme !== ThemeState.Auto ? globalState.theme : "light";

  return (
    <React.StrictMode>
      <div className={clsx(theme === "dark" && "theme-dark")}>{children}</div>
    </React.StrictMode>
  );
};
