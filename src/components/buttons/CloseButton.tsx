import { Cross, CrossIconProps } from "@transferwise/icons";
import { clsx } from "clsx";

import { CloseButtonLabel } from "../../i18nTexts";
import { Button, ButtonOwnProps } from "./_Button";

export type CloseButtonProps = Pick<ButtonOwnProps, "size"> &
  Pick<React.ComponentPropsWithoutRef<"button">, "onClick">;

const iconSizeByComponentSize: {
  [key in NonNullable<CloseButtonProps["size"]>]: CrossIconProps["size"];
} = {
  sm: 16,
  md: 24,
};

export function CloseButton({ size = "md", onClick }: CloseButtonProps) {
  return (
    <Button
      aria-label={CloseButtonLabel}
      size={size}
      equilateral
      className={clsx("hover:bg-background-screen-hover", {
        "-m-2": size === "sm",
        "-m-3": size === "md",
      })}
      onClick={onClick}
    >
      <Cross size={iconSizeByComponentSize[size]} />
    </Button>
  );
}
