import type { Story } from "@ladle/react";

import { TertiaryButton } from "./TertiaryButton";

export const Basic: Story<{
  contents: string;
  size: "sm" | "md";
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}> = function ({ contents, size, loading, disabled, onClick }) {
  return (
    <TertiaryButton
      size={size}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {contents}
    </TertiaryButton>
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
  onClick: {
    action: "clicked",
  },
};

export const Link: Story<{
  contents: string;
  size: "sm" | "md";
}> = function ({ contents, size }) {
  return (
    <TertiaryButton
      size={size}
      render={({ className, children }) => (
        <a href="#_" className={className}>
          {children}
        </a>
      )}
    >
      {contents}
    </TertiaryButton>
  );
};

Link.args = {
  contents: "Click me",
};

Link.argTypes = {
  size: {
    options: ["sm", "md"],
    defaultValue: "md",
    control: { type: "radio" },
  },
};
