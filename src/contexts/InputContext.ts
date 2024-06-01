import { createContext } from "react";

interface InputContextValue {
  name?: string;
}

export const InputContext = createContext<InputContextValue>({});
