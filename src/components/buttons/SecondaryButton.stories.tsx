import type { Story } from "@ladle/react";

import { SecondaryButton } from "./SecondaryButton";

export const Basic: Story<{
  text: string;
  size: "sm" | "md";
  sentiment: "neutral" | "negative";
  disabled: boolean;
  onClick: () => void;
}> = function ({ text, size, sentiment, disabled, onClick }) {
  return (
    <SecondaryButton
      size={size}
      sentiment={sentiment}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </SecondaryButton>
  );
};

Basic.args = {
  text: "Click me",
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
