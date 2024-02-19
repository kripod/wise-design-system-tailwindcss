import type { Story } from "@ladle/react";

import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";

export const Basic: Story<
  Pick<
    PrimaryButtonProps,
    "size" | "sentiment" | "loading" | "disabled" | "children" | "onClick"
  >
> = function ({ size, sentiment, loading, disabled, children, onClick }) {
  return (
    <PrimaryButton
      size={size}
      sentiment={sentiment}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </PrimaryButton>
  );
};

Basic.args = {
  loading: false,
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
