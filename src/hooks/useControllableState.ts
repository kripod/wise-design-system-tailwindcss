import * as React from "react";

import { useWrappedCallback } from "./useWrappedCallback";

export function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);

  const prevControlledValue = React.useRef<T>();
  React.useEffect(() => {
    if (controlledValue == null && prevControlledValue.current != null) {
      setUncontrolledValue(prevControlledValue.current);
    }
    prevControlledValue.current = controlledValue;
  }, [controlledValue]);

  return [
    controlledValue ?? prevControlledValue.current ?? uncontrolledValue,
    useWrappedCallback((action) => {
      if (controlledValue != null) {
        onChange?.(
          typeof action === "function"
            ? (action as (prevState: T) => T)(controlledValue)
            : action,
        );
      } else {
        setUncontrolledValue((prevState) => {
          const nextState =
            typeof action === "function"
              ? (action as (prevState: T) => T)(prevState)
              : action;
          // Avoid nested `setState()` calls from handler by delaying execution:
          // https://reactjs.org/link/setstate-in-render
          queueMicrotask(() => {
            onChange?.(nextState);
          });
          return nextState;
        });
      }
    }),
  ];
}
