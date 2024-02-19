import { CriticalBannerStatusIcon } from "./StatusIcon";

export interface CriticalBannerProps {
  title: string;
  description?: string;
  action: React.ReactNode;
}

export function CriticalBanner({
  title,
  description,
  action,
}: CriticalBannerProps) {
  return (
    <div className="@container">
      <div className="flex flex-col gap-4 bg-sentiment-negative p-6 text-body text-contrast-overlay @lg:flex-row @lg:items-center">
        <CriticalBannerStatusIcon size={48} />
        <div role="alert" className="flex flex-1 flex-col gap-y-2 @lg:gap-y-1">
          <h2 className="text-title-body">{title}</h2>
          {description}
        </div>
        {action}
      </div>
    </div>
  );
}
