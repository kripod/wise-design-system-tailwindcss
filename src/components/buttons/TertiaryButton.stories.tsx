import type { Story } from "@ladle/react";

import { renderButtonAsLink } from "./_Button";
import { TertiaryButton } from "./TertiaryButton";

export const Basic: Story<{
  text: string;
  size: "sm" | "md";
  disabled: boolean | "loading";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = function ({ text, size, disabled, onClick }) {
  return (
    <TertiaryButton size={size} disabled={disabled} onClick={onClick}>
      {text}
    </TertiaryButton>
  );
};

Basic.args = {
  text: "Click me",
  size: "md",
  disabled: false,
};

Basic.argTypes = {
  size: {
    control: { type: "radio" },
    options: ["sm", "md"],
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

export const Link: Story<{
  text: string;
  size: "sm" | "md";
  disabled: boolean;
}> = function ({ text, size, disabled }) {
  return (
    <TertiaryButton
      size={size}
      disabled={disabled}
      render={renderButtonAsLink(({ className, children }) => (
        <a href="#_" className={className}>
          {children}
        </a>
      ))}
    >
      {text}
    </TertiaryButton>
  );
};

Link.args = {
  text: "Click me",
  size: "md",
  disabled: false,
};

Link.argTypes = {
  size: {
    control: { type: "radio" },
    options: ["sm", "md"],
  },
};
