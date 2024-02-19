import type { Story } from "@ladle/react";

import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";

export const Basic: Story<
  Pick<
    PrimaryButtonProps,
    "size" | "sentiment" | "disabled" | "children" | "onClick"
  >
> = ({ size, sentiment, disabled, children, onClick }) => (
  <PrimaryButton
    size={size}
    sentiment={sentiment}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </PrimaryButton>
);

Basic.args = {
  disabled: false,
  children: "Click me",
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
