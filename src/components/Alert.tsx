import {
  AlertCircleFill,
  CheckCircleFill,
  CrossCircleFill,
  InfoCircleFill,
} from "@transferwise/icons";

import { CloseButton } from "./buttons/_CloseButton";

export type AlertProps = {
  sentiment?: "neutral" | "negative" | "positive" | "warning";
  onClose?: () => void;
  children?: React.ReactNode;
};

const IconBySentiment: {
  [key in NonNullable<AlertProps["sentiment"]>]: React.ComponentType<{
    [key: string]: never;
  }>;
} = {
  neutral: () => <InfoCircleFill size={24} />,
  negative: () => (
    <CrossCircleFill size={24} className="text-sentiment-negative" />
  ),
  positive: () => (
    <CheckCircleFill size={24} className="text-sentiment-positive" />
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
  const Icon = IconBySentiment[sentiment];
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-background-neutral p-6 text-content-secondary">
      <Icon />
      {onClose != null ? (
        <CloseButton
          size="sm"
          className="col-start-3 self-start"
          onClick={onClose}
        />
      ) : null}
      <div
        role="alert"
        className="col-span-full flex flex-col items-start gap-y-2 text-sm desktop:col-span-1 desktop:col-start-2 desktop:row-start-1"
      >
        {children}
      </div>
    </div>
  );
}
