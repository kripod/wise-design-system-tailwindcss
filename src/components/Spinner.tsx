import { Refresh, RefreshIconProps } from "@transferwise/icons";

export type SpinnerProps = {
  size?: "md" | "lg";
};

const iconSizeByComponentSize: {
  [key in NonNullable<SpinnerProps["size"]>]: RefreshIconProps["size"];
} = {
  md: 16,
  lg: 24,
};

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <Refresh
      size={iconSizeByComponentSize[size]}
      className="animate-spin motion-reduce:animate-none"
    />
  );
}
