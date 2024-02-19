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
  iconPlacement: "start",
  disabled: false,
};

Basic.argTypes = {
  iconPlacement: {
    control: { type: "radio" },
    options: ["start", "end"],
  },
  onClick: {
    action: "clicked",
  },
};
