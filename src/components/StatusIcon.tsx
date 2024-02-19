import {
  Alert,
  Check,
  Cross,
  Info,
  type InfoIconProps,
} from "@transferwise/icons";
import { clsx } from "clsx";

export type StatusIconProps = {
  size: 16 | 40 | 48;
  sentiment: "neutral" | "negative" | "positive" | "warning";
  className?: string;
};

const IconBySentiment = {
  neutral: ({ size }) => <Info size={size} className="text-contrast-overlay" />,
  negative: ({ size }) => (
    <Cross size={size} className="text-contrast-overlay" />
  ),
  positive: ({ size }) => (
    <Check size={size} className="text-contrast-overlay" />
  ),
  warning: ({ size }) => <Alert size={size} className="text-content-primary" />,
} satisfies {
  [key in NonNullable<StatusIconProps["sentiment"]>]: React.ComponentType<{
    size: NonNullable<InfoIconProps["size"]>;
  }>;
};

export function StatusIcon({ size, sentiment, className }: StatusIconProps) {
  const Icon = IconBySentiment[sentiment];
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full",
        {
          "h-4 w-4 p-px": size === 16,
          "h-10 w-10": size === 40,
          "h-12 w-12": size === 48,
        },
        {
          "bg-content-secondary": sentiment === "neutral",
          "bg-sentiment-negative": sentiment === "negative",
          "bg-sentiment-positive": sentiment === "positive",
          "bg-sentiment-warning": sentiment === "warning",
        },
        className,
      )}
    >
      <Icon size={size === 16 ? 16 : 32} />
    </span>
  );
}
