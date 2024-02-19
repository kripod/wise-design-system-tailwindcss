import type { Story } from "@ladle/react";

import { SecondaryButton, SecondaryButtonProps } from "./SecondaryButton";

export const Basic: Story<
  Pick<
    SecondaryButtonProps,
    "size" | "sentiment" | "loading" | "disabled" | "children" | "onClick"
  >
> = function ({ size, sentiment, loading, disabled, children, onClick }) {
  return (
    <SecondaryButton
      size={size}
      sentiment={sentiment}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </SecondaryButton>
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
  // TODO: Enable when actions are handled without re-rendering
  /*
  onClick: {
    action: "clicked",
  },
  */
};
