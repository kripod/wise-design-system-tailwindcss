import { Cross, CrossIconProps } from "@transferwise/icons";
import { clsx } from "clsx";

import { CloseButtonLabel } from "../../i18nTexts";
import { Button, ButtonOwnProps } from "./_Button";

export type CloseButtonProps = Pick<ButtonOwnProps, "size"> &
  React.ComponentPropsWithoutRef<"button">;

const iconSizeByComponentSize: {
  [key in NonNullable<CloseButtonProps["size"]>]: CrossIconProps["size"];
} = {
  sm: 16,
  md: 24,
};

export function CloseButton({
  size = "md",
  className,
  ...restProps
}: CloseButtonProps) {
  return (
    <Button
      aria-label={CloseButtonLabel}
      size={size}
      equilateral
      className={clsx(
        "text-interactive-primary hover:bg-background-screen-hover",
        {
          "-m-2": size === "sm",
          "-m-3": size === "md",
        },
        className,
      )}
      {...restProps}
    >
      <Cross size={iconSizeByComponentSize[size]} />
    </Button>
  );
}
