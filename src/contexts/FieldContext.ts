import { createContext } from "react";

interface FieldContextValue
  extends Pick<React.AriaAttributes, "aria-describedby" | "aria-invalid"> {
  id?: string;
}

export const FieldContext = createContext<FieldContextValue>({});
