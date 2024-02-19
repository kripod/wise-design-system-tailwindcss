import type { Story } from "@ladle/react";

import { TertiaryButton, TertiaryButtonProps } from "./TertiaryButton";

export const Basic: Story<
  Pick<
    TertiaryButtonProps,
    "size" | "loading" | "disabled" | "children" | "onClick"
  >
> = function ({ size, loading, disabled, children, onClick }) {
  return (
    <TertiaryButton
      size={size}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </TertiaryButton>
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
  onClick: {
    action: "clicked",
  },
};

export const Link: Story<
  Pick<TertiaryButtonProps, "size"> & {
    text: React.ReactNode;
  }
> = function ({ size, text }) {
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
