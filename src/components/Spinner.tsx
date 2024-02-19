import { Refresh, type RefreshIconProps } from "@transferwise/icons";

export type SpinnerProps = {
  size?: "md" | "lg";
};

const iconSizeByComponentSize = {
  md: 16,
  lg: 24,
} satisfies {
  [key in NonNullable<SpinnerProps["size"]>]: RefreshIconProps["size"];
};

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    // TODO: Change icon
    <Refresh
      size={iconSizeByComponentSize[size]}
      className="inline-block animate-spin motion-reduce:animate-none"
    />
  );
}
