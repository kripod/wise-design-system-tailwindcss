import { Alert as AlertIcon, Check, Cross, Info } from "@transferwise/icons";
import { clsx } from "clsx";

import { CloseButton } from "./buttons/CloseButton";

type IconWrapperProps = {
  className?: string;
  children?: React.ReactNode;
};

function IconWrapper({ className, children }: IconWrapperProps) {
  return (
    <span
      className={clsx(
        "inline-flex h-10 w-10 items-center justify-center rounded-full",
        className,
      )}
    >
      {children}
    </span>
  );
}

const IconBySentiment: {
  [key in NonNullable<AlertProps["sentiment"]>]: React.ComponentType<{
    [key: string]: never;
  }>;
} = {
  neutral: () => (
    <IconWrapper className="bg-content-secondary">
      <Info size={32} className="text-contrast-overlay" />
    </IconWrapper>
  ),
  negative: () => (
    <IconWrapper className="bg-sentiment-negative">
      <Cross size={32} className="text-contrast-overlay" />
    </IconWrapper>
  ),
  positive: () => (
    <IconWrapper className="bg-sentiment-positive">
      <Check size={32} className="text-contrast-overlay" />
    </IconWrapper>
  ),
  warning: () => (
    <IconWrapper className="bg-sentiment-warning">
      <AlertIcon size={32} className="text-content-primary" />
    </IconWrapper>
  ),
};

export type AlertProps = {
  sentiment?: "neutral" | "negative" | "positive" | "warning";
  children?: React.ReactNode;
  onClose?: () => void;
};

export function Alert({
  sentiment = "neutral",
  children,
  onClose,
}: AlertProps) {
  const Icon = IconBySentiment[sentiment];
  return (
    <div className="@container">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 rounded-md bg-background-neutral p-6 text-sm text-content-secondary @lg:p-4">
        <Icon />
        {onClose != null ? (
          <CloseButton
            size="sm"
            className="col-start-3 -m-2 self-start @lg:m-0"
            onClick={onClose}
          />
        ) : null}
        <div
          role="alert"
          className="col-span-full flex flex-col gap-y-2 @lg:col-span-1 @lg:col-start-2 @lg:row-start-1"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
