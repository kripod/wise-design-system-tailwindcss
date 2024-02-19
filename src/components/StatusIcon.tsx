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
  className?: string;
};

type StatusIconBaseProps = StatusIconPropsBase & {
  Icon: React.ComponentType<Pick<InfoIconProps, "size">>;
};

function StatusIconBase({ size, className, Icon }: StatusIconBaseProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full",
        {
          "h-4 w-4 p-px": size === 16,
          "h-10 w-10": size === 40,
          "h-12 w-12": size === 48,
        },
        className,
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

export function StatusIcon({
  sentiment,
  className,
  ...restProps
}: StatusIconProps) {
  return (
    <StatusIconBase
      Icon={IconBySentiment[sentiment]}
      className={clsx(
        {
          "bg-content-secondary text-contrast-overlay": sentiment === "neutral",
          "bg-sentiment-negative text-contrast-overlay":
            sentiment === "negative",
          "bg-sentiment-positive text-contrast-overlay":
            sentiment === "positive",
          "bg-sentiment-warning text-content-primary": sentiment === "warning",
        },
        className,
      )}
      {...restProps}
    />
  );
}

export type CriticalBannerStatusIconProps = StatusIconPropsBase;

export function CriticalBannerStatusIcon({
  className,
  ...restProps
}: CriticalBannerStatusIconProps) {
  return (
    <StatusIconBase
      Icon={Alert}
      className={clsx("bg-contrast-overlay text-sentiment-negative", className)}
      {...restProps}
    />
  );
}
