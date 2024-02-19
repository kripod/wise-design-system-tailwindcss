import {
  CheckCircleFill,
  CrossCircleFill,
  InfoCircle,
} from "@transferwise/icons";
import type React from "react";

import { CloseButton } from "./CloseButton";

export type AlertProps = {
  sentiment?: "neutral" | "positive" | "negative" | "warning";
  children?: React.ReactNode;
  onClose?: () => void;
};

const iconBySentiment: {
  [key in NonNullable<AlertProps["sentiment"]>]: React.ComponentType<{
    [key: string]: never;
  }>;
} = {
  neutral: () => <InfoCircle />,
  positive: () => <CheckCircleFill />,
  negative: () => <CrossCircleFill />,
  warning: () => <InfoCircle />,
};

export function Alert({
  sentiment = "neutral",
  children,
  onClose,
}: AlertProps) {
  const Icon = iconBySentiment[sentiment];

  return (
    <div
      role="alert"
      className="rounded-lg bg-background-neutral p-6 space-y-4"
    >
      <div className="flex justify-between items-start">
        <Icon />
        {onClose != null ? <CloseButton onClick={onClose} /> : null}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
