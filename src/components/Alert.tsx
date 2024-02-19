import { CloseButton } from "./buttons/CloseButton";
import { StatusIcon } from "./StatusIcon";

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
  return (
    <div className="@container">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 rounded-md bg-background-neutral p-6 text-sm text-content-secondary @lg:p-4">
        <StatusIcon size={40} sentiment={sentiment} />
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
