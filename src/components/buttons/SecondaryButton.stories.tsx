import type { Story } from "@ladle/react";

import { SecondaryButton } from "./SecondaryButton";

export const Basic: Story<{
  text: string;
  size: "sm" | "md";
  sentiment: "neutral" | "negative";
  disabled: boolean | "loading";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
