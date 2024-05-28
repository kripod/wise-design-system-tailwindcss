import { createContext } from "react";

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type InputGroupContextValue = State<{
  paddingInlineStart: React.CSSProperties["paddingInlineStart"];
  paddingInlineEnd: React.CSSProperties["paddingInlineEnd"];
}>;

export const InputGroupContext = createContext<InputGroupContextValue>([
  {
    paddingInlineStart: undefined,
    paddingInlineEnd: undefined,
  },
  () => {},
]);
