import { useId } from "@radix-ui/react-id";
import { AlertCircle } from "@transferwise/icons";
import { clsx } from "clsx";

import {
  FormControlDescribedByProvider,
  FormControlInvalidProvider,
  useFormControlDescribedBy,
  useFormControlInvalid,
} from "./_FormControl";
import { Label } from "./Label";

type FieldDescriptionProps = {
  children?: React.ReactNode;
};

function FieldDescription({ children }: FieldDescriptionProps) {
  const descriptionId = useFormControlDescribedBy();
  const invalid = useFormControlInvalid();

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

export type FieldProps = {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function Field({ label, hint, error, className, children }: FieldProps) {
  const description = error ?? hint;
  const descriptionId = useId();

  return (
    <FormControlDescribedByProvider
      value={description ? descriptionId : undefined}
    >
      <FormControlInvalidProvider value={Boolean(error)}>
        <span className={clsx(className, "inline-flex flex-col gap-y-2")}>
          <Label>
            {label}
            {children}
          </Label>

          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
        </span>
      </FormControlInvalidProvider>
    </FormControlDescribedByProvider>
  );
}
