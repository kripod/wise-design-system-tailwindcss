import type { Story } from "@ladle/react";

import { PrimaryButton } from "./PrimaryButton";

export const Basic: Story<{
  text: string;
  size: "sm" | "md";
  sentiment: "neutral" | "negative";
  disabled: boolean | "loading";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
  size: "md",
  sentiment: "neutral",
  disabled: false,
};

Basic.argTypes = {
  size: {
    control: { type: "radio" },
    options: ["sm", "md"],
  },
  sentiment: {
    control: { type: "radio" },
    options: ["neutral", "negative"],
  },
  disabled: {
    control: { type: "radio" },
    options: [false, true, "loading"],
    defaultValue: false, // TODO: Remove once Ladle gets fixed
  },
  onClick: {
    action: "clicked",
  },
};
