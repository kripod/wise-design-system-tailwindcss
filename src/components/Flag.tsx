import * as React from "react";

export interface FlagProps {
  /**
   * Two-letter country code (ISO 3166-1 alpha-2) or three-letter currency code (ISO 4217).
   */
  code: string;

  /**
   * Width and height to reserve for the underlying image, in pixels. A detailed variant is shown from 150px and above.
   */
  intrinsicSize?: number;
}

const unknownFlagName = "wise";

export function Flag({ code, intrinsicSize = 64 }: FlagProps) {
  const [fallback, setFallback] = React.useState<"simple" | "unknown" | null>(
    null,
  );
  React.useEffect(() => {
    setFallback(null);
  }, [code]);

  const detailed = intrinsicSize >= 150;
  const name =
    fallback !== "unknown"
      ? `${code.toLowerCase()}${
          fallback == null && detailed ? "-detailed" : ""
        }`
      : unknownFlagName;

  return (
    <span className="inline-grid *:col-start-1 *:row-start-1">
      <img
        src={`https://wise.com/web-art/assets/flags/${name}.svg`}
        alt=""
        width={intrinsicSize}
        height={intrinsicSize}
        onError={() => {
          setFallback((prev) =>
            prev == null && detailed ? "simple" : "unknown",
          );
        }}
      />
      <span className="rounded-full ring-1 ring-inset ring-border-neutral" />
    </span>
  );
}
