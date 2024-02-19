import type { Story } from "@ladle/react";

import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";

export const Basic: Story<
  Pick<PrimaryButtonProps, "size" | "sentiment" | "disabled" | "onClick">
> = ({ size, sentiment, disabled, onClick }) => (
  <PrimaryButton
    size={size}
    sentiment={sentiment}
    disabled={disabled}
    onClick={onClick}
  >
    Button
  </PrimaryButton>
);

Basic.args = {
  disabled: false,
};

Basic.argTypes = {
  size: {
    options: ["sm", "md"],
    defaultValue: "md",
    control: { type: "radio" },
  },
  sentiment: {
    options: ["neutral", "negative"],
    defaultValue: "neutral",
    control: { type: "radio" },
  },
  onClick: {
    action: "clicked",
  },
};
