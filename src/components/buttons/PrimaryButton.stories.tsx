import type { Story } from "@ladle/react";

import { PrimaryButton } from "./PrimaryButton";

export const Basic: Story<{
  text: string;
  size: "sm" | "md";
  sentiment: "neutral" | "negative";
  disabled: boolean | "loading";
  onClick: () => void;
}> = function ({ text, size, sentiment, disabled, onClick }) {
  return (
    <PrimaryButton
      size={size}
      sentiment={sentiment}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </PrimaryButton>
  );
};

Basic.args = {
  text: "Click me",
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
  disabled: {
    options: [false, true, "loading"],
    defaultValue: false,
    control: { type: "radio" },
  },
  onClick: {
    action: "clicked",
  },
};
