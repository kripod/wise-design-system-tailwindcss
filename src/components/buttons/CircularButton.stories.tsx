import type { Story } from "@ladle/react";
import { Plus } from "@transferwise/icons";

import { CircularButton } from "./CircularButton";

export const Basic: Story<{
  text: string;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = function ({ text, disabled, onClick }) {
  return (
    <CircularButton
      icon={<Plus size={24} />}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </CircularButton>
  );
};

Basic.args = {
  text: "Add money",
  disabled: false,
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
