import type { Story } from "@ladle/react";

import { TertiaryButton } from "./TertiaryButton";

export const Basic: Story<{
  text: string;
  size: "sm" | "md";
  disabled: boolean;
  onClick: () => void;
}> = function ({ text, size, disabled, onClick }) {
  return (
    <TertiaryButton size={size} disabled={disabled} onClick={onClick}>
      {text}
    </TertiaryButton>
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
  onClick: {
    action: "clicked",
  },
};

export const Link: Story<{
  text: string;
  size: "sm" | "md";
}> = function ({ text, size }) {
  return (
    <TertiaryButton
      size={size}
      render={({ className, children }) => (
        <a href="#_" className={className}>
          {children}
        </a>
      )}
    >
      {text}
    </TertiaryButton>
  );
};

Link.args = {
  text: "Click me",
};

Link.argTypes = {
  size: {
    options: ["sm", "md"],
    defaultValue: "md",
    control: { type: "radio" },
  },
};
