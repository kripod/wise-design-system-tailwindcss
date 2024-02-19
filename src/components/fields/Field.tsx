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

export type FieldControlPropsBase = {
  size?: "auto" | "sm" | "md" | "lg" | "xl";
};

export function fieldControlClassNameBase({
  size = "auto",
}: FieldControlPropsBase = {}) {
  return clsx(
    "px-4 text-content-primary ring-1 ring-inset ring-interactive-secondary transition-shadow invalid:ring invalid:!ring-sentiment-negative enabled:hover:ring enabled:hover:ring-interactive-secondary-hover enabled:focus:outline-none enabled:focus:ring-3 enabled:focus:ring-interactive-primary disabled:opacity-45 disabled:mix-blend-luminosity",
    {
      "py-3 text-base": size === "auto",
      "h-8 text-sm": size === "sm",
      "h-12 text-base": size === "md",
      "h-14 text-base": size === "lg",
      "h-18 text-xl": size === "xl",
    },
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
