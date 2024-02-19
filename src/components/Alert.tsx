import {
  CheckCircleFill,
  CrossCircleFill,
  InfoCircle,
} from "@transferwise/icons";

import { CloseButton } from "./buttons/CloseButton";

export type AlertProps = {
  sentiment?: "neutral" | "positive" | "negative" | "warning";
  onClose?: () => void;
  children?: React.ReactNode;
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
  onClose,
  children,
}: AlertProps) {
  const Icon = iconBySentiment[sentiment];

  return (
    <div
      role="alert"
      className="space-y-4 rounded-lg bg-background-neutral p-6"
    >
      <div className="flex items-start justify-between">
        <Icon />
        {onClose != null ? <CloseButton onClick={onClose} /> : null}
      </div>

      <div className="text-sm text-content-secondary">{children}</div>
    </div>
  );
}
