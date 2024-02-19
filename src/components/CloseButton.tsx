import { Cross, CrossIconProps } from "@transferwise/icons";
import clsx from "clsx";

export type CloseButtonProps = {
  size?: "md" | "lg";
  onClick?: () => void;
};

const iconSizeByComponentSize: {
  [key in NonNullable<CloseButtonProps["size"]>]: CrossIconProps["size"];
} = {
  md: 16,
  lg: 24,
};

export function CloseButton({ size = "md", onClick }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={clsx({
        "-m-4 p-4": size === "md",
        "-m-3 p-3": size === "lg",
      })}
      onClick={() => {
        onClick?.();
      }}
    >
      <Cross title="Close" size={iconSizeByComponentSize[size]} />
    </button>
  );
}
