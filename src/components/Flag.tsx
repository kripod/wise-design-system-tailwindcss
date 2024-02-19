import * as React from "react";

export interface FlagProps {
  code: string;
  size: number;
}

const defaultFlagName = "wise";

export function Flag({ code, size }: FlagProps) {
  const [fallback, setFallback] = React.useState(false);
  React.useEffect(() => {
    setFallback(false);
  }, [code]);

  const name = !fallback
    ? `${code.toLowerCase()}${size >= 150 ? "-detailed" : ""}`
    : defaultFlagName;

  return (
    <img
      src={`https://wise.com/web-art/assets/flags/${name}.svg`}
      alt=""
      width={size}
      height={size}
      onError={() => {
        setFallback(true);
      }}
    />
  );
}
