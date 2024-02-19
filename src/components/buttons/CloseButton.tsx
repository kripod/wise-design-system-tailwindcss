import { Cross, type CrossIconProps } from "@transferwise/icons";
import { clsx } from "clsx";

import { CloseButtonLabel } from "../../i18nTexts";
import { Button, type ButtonPropsBase } from "./_Button";

export interface CloseButtonProps
  extends Pick<ButtonPropsBase, "className" | "onClick"> {
  size?: "sm" | "md" | "lg";
}

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
      className={clsx(
        className,
        "inline-flex items-center justify-center rounded-full bg-background-neutral text-interactive-primary hover:bg-background-neutral-hover active:bg-background-neutral-active",
        {
          "size-6": size === "sm",
          "size-8": size === "md",
          "size-10": size === "lg",
        },
      )}
      {...restProps}
    >
      <Cross size={iconSizeByComponentSize[size]} />
    </Button>
  );
}
