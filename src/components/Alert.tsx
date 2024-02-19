import {
  AlertCircleFill,
  CheckCircleFill,
  CrossCircleFill,
  InfoCircleFill,
} from "@transferwise/icons";

import { CloseButton } from "./buttons/CloseButton";

export type AlertProps = {
  sentiment?: "neutral" | "negative" | "positive" | "warning";
  children?: React.ReactNode;
  onClose?: () => void;
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
  children,
  onClose,
}: AlertProps) {
  const Icon = IconBySentiment[sentiment];
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-4 rounded-md bg-background-neutral p-6 text-sm text-content-secondary @container">
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
        className="col-span-full flex flex-col items-start gap-y-2 self-center @xl:col-span-1 @xl:col-start-2 @xl:row-start-1"
      >
        {children}
      </div>
    </div>
  );
}
