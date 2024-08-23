import {
  Alert,
  Check,
  Cross,
  Info,
  type InfoIconProps,
} from "@transferwise/icons";
import { clsx } from "clsx/lite";

interface StatusIconPropsBase {
  size: 16 | 40 | 48;
}

interface StatusIconBaseProps extends StatusIconPropsBase {
  Icon: React.ComponentType<Pick<InfoIconProps, "size">>;
  className?: string;
}

function StatusIconBase({ size, Icon, className }: StatusIconBaseProps) {
  return (
    <span
      className={clsx(
        className,
        "inline-flex items-center justify-center rounded-full",
        size === 16 && "size-4 p-px",
        size === 40 && "size-10",
        size === 48 && "size-12",
      )}
    >
      <Icon size={size === 16 ? 16 : 32} />
    </span>
  );
}

export interface StatusIconProps extends StatusIconPropsBase {
  sentiment: "neutral" | "negative" | "positive" | "warning";
}

const IconBySentiment = {
  neutral: Info,
  negative: Cross,
  positive: Check,
  warning: Alert,
} satisfies Record<StatusIconProps["sentiment"], StatusIconBaseProps["Icon"]>;

export function StatusIcon({ sentiment, ...restProps }: StatusIconProps) {
  return (
    <StatusIconBase
      Icon={IconBySentiment[sentiment]}
      className={clsx(
        sentiment === "neutral" && "bg-content-secondary text-contrast-overlay",
        sentiment === "negative" &&
          "bg-sentiment-negative text-contrast-overlay",
        sentiment === "positive" &&
          "bg-sentiment-positive text-contrast-overlay",
        sentiment === "warning" && "bg-sentiment-warning text-content-primary",
      )}
      {...restProps}
    />
  );
}

export interface CriticalBannerStatusIconProps extends StatusIconPropsBase {}

export function CriticalBannerStatusIcon(props: CriticalBannerStatusIconProps) {
  return (
    <StatusIconBase
      Icon={Alert}
      className="bg-contrast-overlay text-sentiment-negative"
      {...props}
    />
  );
}
