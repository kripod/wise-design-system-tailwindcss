import {
  Alert,
  Check,
  Cross,
  Info,
  type InfoIconProps,
} from "@transferwise/icons";
import { clsx } from "clsx";

type StatusIconPropsBase = {
  size: 16 | 40 | 48;
};

type StatusIconBaseProps = StatusIconPropsBase & {
  Icon: React.ComponentType<Pick<InfoIconProps, "size">>;
  className?: string;
};

function StatusIconBase({ size, Icon, className }: StatusIconBaseProps) {
  return (
    <span
      className={clsx(
        className,
        "inline-flex items-center justify-center rounded-full",
        {
          "h-4 w-4 p-px": size === 16,
          "h-10 w-10": size === 40,
          "h-12 w-12": size === 48,
        },
      )}
    >
      <Icon size={size === 16 ? 16 : 32} />
    </span>
  );
}

export type StatusIconProps = StatusIconPropsBase & {
  sentiment: "neutral" | "negative" | "positive" | "warning";
};

const IconBySentiment = {
  neutral: Info,
  negative: Cross,
  positive: Check,
  warning: Alert,
} satisfies {
  [key in StatusIconProps["sentiment"]]: StatusIconBaseProps["Icon"];
};

export function StatusIcon({ sentiment, ...restProps }: StatusIconProps) {
  return (
    <StatusIconBase
      Icon={IconBySentiment[sentiment]}
      className={clsx({
        "bg-content-secondary text-contrast-overlay": sentiment === "neutral",
        "bg-sentiment-negative text-contrast-overlay": sentiment === "negative",
        "bg-sentiment-positive text-contrast-overlay": sentiment === "positive",
        "bg-sentiment-warning text-content-primary": sentiment === "warning",
      })}
      {...restProps}
    />
  );
}

export type CriticalBannerStatusIconProps = StatusIconPropsBase;

export function CriticalBannerStatusIcon(props: CriticalBannerStatusIconProps) {
  return (
    <StatusIconBase
      Icon={Alert}
      className="bg-contrast-overlay text-sentiment-negative"
      {...props}
    />
  );
}
