import { Cross, type CrossIconProps } from "@transferwise/icons";
import { clsx } from "clsx";

import { CloseButtonLabel } from "../../i18nTexts";
import { Button, type ButtonPropsBase } from "./_Button";

export type CloseButtonProps = Pick<
  ButtonPropsBase,
  "className" | "onClick"
> & {
  size?: "sm" | "md" | "lg";
};

const iconSizeByComponentSize = {
  sm: 16,
  md: 16,
  lg: 24,
} satisfies {
  [key in NonNullable<CloseButtonProps["size"]>]: CrossIconProps["size"];
};

export function CloseButton({
  size = "md",
  className,
  ...restProps
}: CloseButtonProps) {
  return (
    <Button
      aria-label={CloseButtonLabel}
      equilateral
      className={clsx(
        "rounded-full bg-background-neutral text-interactive-primary hover:bg-background-neutral-hover active:bg-background-neutral-active",
        {
          "p-1": size === "sm",
          "p-2": size === "md" || size === "lg",
        },
        className,
      )}
      {...restProps}
    >
      <Cross size={iconSizeByComponentSize[size]} />
    </Button>
  );
}
