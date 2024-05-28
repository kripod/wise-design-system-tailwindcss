import { createContext } from "react";

interface FieldContextValue
  extends Pick<
    React.HTMLAttributes<HTMLElement>,
    "id" | "aria-describedby" | "aria-invalid"
  > {}

export const FieldContext = createContext<FieldContextValue>({});
