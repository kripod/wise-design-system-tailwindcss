import { AlertCircle } from "@transferwise/icons";
import { clsx } from "clsx";
import * as React from "react";

const FieldDescribedByContext = React.createContext<string | undefined>(
  undefined,
);

export function useFieldDescribedBy() {
  return React.useContext(FieldDescribedByContext);
}

export type FieldProps = {
  description?: React.ReactNode;
  children?: React.ReactNode;
};

export function Field({ description, children }: FieldProps) {
  const descriptionId = React.useId();

  return (
    <FieldDescribedByContext.Provider value={descriptionId}>
      <span className="group/field inline-flex flex-col gap-y-2">
        {children}
        {description != null ? (
          <span
            id={descriptionId}
            className={
              'inline-flex gap-x-1 text-sm text-content-secondary transition-colors group-[:has([aria-invalid="true"])]/field:text-sentiment-negative'
            }
          >
            <span
              className={
                'hidden items-center self-start group-[:has([aria-invalid="true"])]/field:inline-flex'
              }
            >
              {/* TODO: Use `h-1lh` on container and remove zero-width space */}
              &#8203; {/* Mimics `height: 1lh` on container */}
              <AlertCircle />
            </span>
            <span>{description}</span>
          </span>
        ) : null}
      </span>
    </FieldDescribedByContext.Provider>
  );
}

export type FieldControlPropsBase = {
  size?: "auto" | "sm" | "md" | "lg" | "xl";
};

export function fieldControlClassNameBase({
  size = "auto",
}: FieldControlPropsBase = {}) {
  return clsx(
    "px-4 text-content-primary ring-1 ring-inset ring-interactive-secondary transition aria-invalid:ring-2 aria-invalid:!ring-sentiment-negative enabled:hover:ring-2 enabled:hover:ring-interactive-secondary-hover enabled:focus:outline-none enabled:focus:ring-3 enabled:focus:ring-interactive-primary disabled:opacity-45 disabled:mix-blend-luminosity",
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
