import type { Story } from "@ladle/react";

import { SecondaryButton } from "./SecondaryButton";

export const Basic: Story<{
  contents: string;
  size: "sm" | "md";
  sentiment: "neutral" | "negative";
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}> = function ({ contents, size, sentiment, loading, disabled, onClick }) {
  return (
    <SecondaryButton
      size={size}
      sentiment={sentiment}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {contents}
    </SecondaryButton>
  );
};

Basic.args = {
  contents: "Click me",
  loading: false,
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
