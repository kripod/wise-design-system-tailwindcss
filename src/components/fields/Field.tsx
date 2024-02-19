import { clsx } from "clsx";
import { atom, Provider, useSetAtom } from "jotai";
import * as React from "react";

export type FieldProps = {
  children?: React.ReactNode;
};

export function Field({ children }: FieldProps) {
  return (
    <Provider>
      <span className="inline-flex flex-col gap-y-2">{children}</span>
    </Provider>
  );
}

export type LabelProps = {
  children?: React.ReactNode;
};

export function Label({ children }: LabelProps) {
  return (
    <label className="inline-flex flex-col gap-y-1 text-sm text-content-secondary">
      {children}
    </label>
  );
}

export type FieldDescriptionProps = {
  sentiment?: "neutral" | "negative";
  children?: React.ReactNode;
};

export const fieldDescribedByAtom = atom<string | undefined>(undefined);
export const fieldInvalidAtom = atom<boolean | undefined>(undefined);

export function FieldDescription({
  sentiment = "neutral",
  children,
}: FieldDescriptionProps) {
  const id = React.useId();
  const setFieldDescribedBy = useSetAtom(fieldDescribedByAtom);
  React.useEffect(() => {
    setFieldDescribedBy(id);
    return () => {
      setFieldDescribedBy(undefined);
    };
  }, [id, setFieldDescribedBy]);

  const invalid = sentiment === "negative";
  const setFieldInvalid = useSetAtom(fieldInvalidAtom);
  React.useEffect(() => {
    setFieldInvalid(invalid);
    return () => {
      setFieldInvalid(undefined);
    };
  }, [invalid, setFieldInvalid]);

  return (
    <span
      id={id}
      className={clsx("text-sm transition-colors", {
        "text-content-secondary": sentiment === "neutral",
        "text-sentiment-negative": sentiment === "negative",
      })}
    >
      {children}
    </span>
  );
}
