import type { Story } from "@ladle/react";
import { Profile } from "@transferwise/icons";

import { ActionButton } from "./ActionButton";

export const Basic: Story<{
  text: string;
  iconPlacement: "start" | "end";
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = function ({ text, iconPlacement, disabled, onClick }) {
  return (
    <ActionButton
      icon={<Profile size={16} />}
      iconPlacement={iconPlacement}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </ActionButton>
  );
};

Basic.args = {
  text: "Click me",
  disabled: false,
};

Basic.argTypes = {
  iconPlacement: {
    options: ["start", "end"],
    defaultValue: "start",
    control: { type: "radio" },
  },
  onClick: {
    action: "clicked",
  },
};
