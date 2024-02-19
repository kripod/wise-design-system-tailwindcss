import { useId } from "@radix-ui/react-id";
import { AlertCircle } from "@transferwise/icons";
import { clsx } from "clsx";
import * as React from "react";

import { Label } from "./Label";

const InputIdContext = React.createContext<string | undefined>(undefined);

const InputDescribedByContext = React.createContext<string | undefined>(
  undefined,
);

const InputInvalidContext = React.createContext<boolean | undefined>(undefined);

export function useInputAttributes() {
  return {
    id: React.useContext(InputIdContext),
    "aria-describedby": React.useContext(InputDescribedByContext),
    "aria-invalid": React.useContext(InputInvalidContext),
  } satisfies React.HTMLAttributes<HTMLElement>;
}

interface FieldDescriptionProps {
  children?: React.ReactNode;
}

function FieldDescription({ children }: FieldDescriptionProps) {
  const descriptionId = React.useContext(InputDescribedByContext);
  const invalid = React.useContext(InputInvalidContext);

  return (
    /* Align icon with first line: https://twitter.com/adamwathan/status/1217864323466432516 */
    <span
      id={descriptionId}
      className={clsx(
        "inline-flex items-start gap-x-1 text-body transition-colors",
        invalid ? "text-sentiment-negative" : "text-content-secondary",
      )}
    >
      {invalid ? (
        <span className="inline-flex items-center" aria-hidden>
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
  id?: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  const fallbackInputId = useId();
  const inputId = id ?? fallbackInputId;

  const description = error || hint;
  const descriptionId = useId();

  return (
    <InputIdContext.Provider value={inputId}>
      <InputDescribedByContext.Provider
        value={description ? descriptionId : undefined}
      >
        <InputInvalidContext.Provider value={Boolean(error)}>
          <span className={clsx(className, "inline-flex flex-col gap-y-2")}>
            <Label htmlFor={inputId}>
              {label}
              {children}
            </Label>

            {description ? (
              <FieldDescription>{description}</FieldDescription>
            ) : null}
          </span>
        </InputInvalidContext.Provider>
      </InputDescribedByContext.Provider>
    </InputIdContext.Provider>
  );
}
