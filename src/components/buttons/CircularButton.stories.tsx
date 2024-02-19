import type { Story } from "@ladle/react";
import { Plus } from "@transferwise/icons";

import { CircularButton } from "./CircularButton";

export const Basic: Story<{
  contents: string;
  disabled: boolean;
  onClick: () => void;
}> = function ({ contents, disabled, onClick }) {
  return (
    <CircularButton
      icon={<Plus size={24} />}
      disabled={disabled}
      onClick={onClick}
    >
      {contents}
    </CircularButton>
  );
};

Basic.args = {
  contents: "Add money",
  disabled: false,
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
