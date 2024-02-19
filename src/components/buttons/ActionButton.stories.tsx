import type { Story } from "@ladle/react";
import { Profile } from "@transferwise/icons";

import { ActionButton } from "./ActionButton";

export const Basic: Story<{
  text: string;
  disabled: boolean;
  onClick: () => void;
}> = function ({ text, disabled, onClick }) {
  return (
    <ActionButton disabled={disabled} onClick={onClick}>
      <Profile size={16} /> {text}
    </ActionButton>
  );
};

Basic.args = {
  text: "Click me",
  disabled: false,
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
