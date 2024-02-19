import * as React from "react";

export interface FlagProps {
  /**
   * Two-letter country code (ISO 3166-1 alpha-2) or three-letter currency code (ISO 4217).
   */
  code: string;

  /**
   * Width and height to reserve for the underlying image, in pixels.
   */
  size?: number;
}

const defaultFlagName = "wise";

export function Flag({ code, size = 64 }: FlagProps) {
  const [fallback, setFallback] = React.useState<"simple" | "default" | null>(
    null,
  );
  React.useEffect(() => {
    setFallback(null);
  }, [code]);

  const name =
    fallback !== "default"
      ? `${code.toLowerCase()}${
          fallback == null && size >= 150 ? "-detailed" : ""
        }`
      : defaultFlagName;

  return (
    <img
      src={`https://wise.com/web-art/assets/flags/${name}.svg`}
      alt=""
      width={size}
      height={size}
      onError={() => {
        setFallback((prev) => (prev == null ? "simple" : "default"));
      }}
    />
  );
}
