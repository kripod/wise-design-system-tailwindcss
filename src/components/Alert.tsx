import {
  AlertCircleFill,
  CheckCircleFill,
  CrossCircleFill,
  InfoCircleFill,
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
  neutral: () => <InfoCircleFill size={24} />,
  positive: () => (
    <CheckCircleFill size={24} className="text-sentiment-positive" />
  ),
  negative: () => (
    <CrossCircleFill size={24} className="text-sentiment-negative" />
  ),
  warning: () => (
    <AlertCircleFill size={24} className="text-sentiment-warning" />
  ),
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
      className="grid grid-cols-[auto,1fr,auto] items-center gap-4 rounded-lg bg-background-neutral p-6 text-content-secondary"
    >
      <Icon />
      <div className="col-span-full row-start-2 space-y-2 text-sm desktop:col-span-1 desktop:row-start-auto">
        {children}
      </div>
      {onClose != null ? (
        <CloseButton
          size="sm"
          className="col-start-3 self-start"
          onClick={onClose}
        />
      ) : null}
    </div>
  );
}
