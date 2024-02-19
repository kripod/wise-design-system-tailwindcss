import "../src/styles.css";

import { GlobalProvider, ThemeState } from "@ladle/react";
import * as React from "react";

export const Provider: GlobalProvider = function ({ globalState, children }) {
  const [theme, setTheme] = React.useState<"light" | "dark">();
  React.useEffect(() => {
    if (globalState.theme !== ThemeState.Auto) {
      setTheme(globalState.theme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme(undefined);
    }
  }, [globalState.theme]);

  return (
    <div className={theme === "dark" ? "dark" : undefined}>{children}</div>
  );
};
