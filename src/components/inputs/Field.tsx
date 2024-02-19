import { useId } from "@radix-ui/react-id";
import { AlertCircle } from "@transferwise/icons";
import { clsx } from "clsx";
import * as React from "react";

import { Label } from "./Label";

const InputDescribedByContext = React.createContext<string | undefined>(
  undefined,
);

const InputInvalidContext = React.createContext<boolean | undefined>(undefined);

export function useInputAriaAttributes() {
  return {
    "aria-describedby": React.useContext(InputDescribedByContext),
    "aria-invalid": React.useContext(InputInvalidContext),
  } satisfies React.AriaAttributes;
}

interface FieldDescriptionProps {
  children?: React.ReactNode;
}

function FieldDescription({ children }: FieldDescriptionProps) {
  const descriptionId = React.useContext(InputDescribedByContext);
  const invalid = React.useContext(InputInvalidContext);

  return (
    <span
      id={descriptionId}
      className={clsx(
        "inline-flex items-start gap-x-1 text-sm transition-colors",
        invalid ? "text-sentiment-negative" : "text-content-secondary",
      )}
    >
      {invalid ? (
        <span className="inline-flex items-center">
          {/* TODO: Use `h-1lh` on container and remove zero-width space */}
          &#8203; {/* Mimics `height: 1lh` on container */}
          <AlertCircle size={16} />
        </span>
      ) : null}
      <span className="flex-1">{children}</span>
    </span>
  );
}

export interface FieldProps {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Field({ label, hint, error, className, children }: FieldProps) {
  const description = error ?? hint;
  const descriptionId = useId();

  return (
    <InputDescribedByContext.Provider
      value={description ? descriptionId : undefined}
    >
      <InputInvalidContext.Provider value={error != null}>
        <span className={clsx(className, "inline-flex flex-col gap-y-2")}>
          <Label>
            {label}
            {children}
          </Label>

          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
        </span>
      </InputInvalidContext.Provider>
    </InputDescribedByContext.Provider>
  );
}
