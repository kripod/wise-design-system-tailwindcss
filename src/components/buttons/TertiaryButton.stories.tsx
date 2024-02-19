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
