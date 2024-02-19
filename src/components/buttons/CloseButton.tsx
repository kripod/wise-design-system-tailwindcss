import { Cross, CrossIconProps } from "@transferwise/icons";
import { clsx } from "clsx";

import { CloseButtonLabel } from "../../i18nTexts";
import { Button, ButtonPropsBase } from "./_Button";

export type CloseButtonProps = Omit<
  ButtonPropsBase,
  "loading" | "disabled" | "children"
> & {
  size?: "sm" | "md";
};

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
        "rounded-full text-interactive-primary hover:bg-background-screen-hover",
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
