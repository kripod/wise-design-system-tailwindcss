import { useEffect, useState } from "react";

export interface FlagProps {
  /** Two-letter country code (ISO 3166-1 alpha-2) or three-letter currency code (ISO 4217). */
  code: string;

  /** Width and height to reserve for the underlying image, in pixels. A detailed variant is shown from 150px and above. */
  intrinsicSize?: number;
}

const unknownFlagName = "wise";

export function Flag({ code, intrinsicSize = 64 }: FlagProps) {
  const [fallback, setFallback] = useState<"simple" | "unknown" | null>(null);
  useEffect(() => {
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
    <img
      src={`https://wise.com/web-art/assets/flags/${name}.svg`}
      alt=""
      width={intrinsicSize}
      height={intrinsicSize}
      className="rounded-full outline outline-1 -outline-offset-1 outline-border-neutral"
      onError={() => {
        setFallback((prev) =>
          prev == null && detailed ? "simple" : "unknown",
        );
      }}
    />
  );
}
