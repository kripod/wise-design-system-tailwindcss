import type { Story } from "@ladle/react";
import { Plus } from "@transferwise/icons";

import { CircularButton, CircularButtonProps } from "./CircularButton";

export const Basic: Story<
  Pick<CircularButtonProps, "disabled" | "children" | "onClick">
> = function ({ disabled, children, onClick }) {
  return (
    <CircularButton
      icon={<Plus size={24} />}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </CircularButton>
  );
};

Basic.args = {
  disabled: false,
  children: "Add money",
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
