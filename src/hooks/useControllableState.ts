import * as React from "react";

import { useEffectEvent } from "./useEffectEvent";

export function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: NoInfer<T>,
  onChange: ((value: T) => void) | undefined,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);

  const prevControlledValue = React.useRef<T>();
  React.useEffect(() => {
    if (
      controlledValue === undefined &&
      prevControlledValue.current !== undefined
    ) {
      setUncontrolledValue(prevControlledValue.current);
    }
    prevControlledValue.current = controlledValue;
  }, [controlledValue]);

  const fallbackValue =
    prevControlledValue.current !== undefined
      ? prevControlledValue.current
      : uncontrolledValue;

  return [
    controlledValue !== undefined ? controlledValue : fallbackValue,
    useEffectEvent((action) => {
      if (controlledValue !== undefined) {
        onChange?.(
          typeof action === "function"
            ? (action as (prevState: T) => T)(controlledValue)
            : action,
        );
      } else {
        let handled = false;
        setUncontrolledValue((prevState) => {
          const nextState =
            typeof action === "function"
              ? (action as (prevState: T) => T)(prevState)
              : action;
          // Avoid nested `setState()` calls from handler by delaying execution:
          // https://reactjs.org/link/setstate-in-render
          queueMicrotask(() => {
            if (!handled) {
              handled = true;
              onChange?.(nextState);
            }
          });
          return nextState;
        });
      }
    }),
  ];
}
