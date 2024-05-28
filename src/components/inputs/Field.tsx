import { AlertCircle } from "@transferwise/icons";
import { clsx } from "clsx/lite";
import { useContext, useId, useMemo } from "react";

import { FieldContext } from "../../contexts/FieldContext";
import { Label } from "./Label";

interface FieldDescriptionProps {
  children?: React.ReactNode;
}

function FieldDescription({ children }: FieldDescriptionProps) {
  const { "aria-describedby": id, "aria-invalid": invalid } =
    useContext(FieldContext);

  return (
    /* Align icon with first line: https://twitter.com/adamwathan/status/1217864323466432516 */
    <span
      id={id}
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
  const fallbackControlId = useId();
  const controlId = id ?? fallbackControlId;

  const description = error || hint;
  const descriptionId = useId();

  return (
    <FieldContext.Provider
      value={useMemo(
        () => ({
          id: controlId,
          "aria-describedby": description ? descriptionId : undefined,
          "aria-invalid": Boolean(error),
        }),
        [controlId, description, descriptionId, error],
      )}
    >
      <span className={clsx(className, "inline-flex flex-col gap-y-2")}>
        <Label htmlFor={controlId}>
          {label}
          {children}
        </Label>

        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </span>
    </FieldContext.Provider>
  );
}
