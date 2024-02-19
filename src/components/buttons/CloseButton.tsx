import { Cross, CrossIconProps } from "@transferwise/icons";
import { clsx } from "clsx";
import type { Merge } from "ts-essentials";

import { CloseButtonLabel } from "../../i18nTexts";
import { Button, ButtonProps } from "./_Button";

export type CloseButtonProps = Merge<
  Omit<
    ButtonProps,
    | "equilateral"
    | "loading"
    | "disabled"
    | "children"
    | "aria-label"
    | "aria-labelledby"
    | "aria-pressed"
  >,
  {
    size?: "sm" | "md";
  }
>;

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
