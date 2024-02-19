import type { Story } from "@ladle/react";
import { Profile } from "@transferwise/icons";

import { ActionButton, ActionButtonProps } from "./ActionButton";

export const Basic: Story<
  Pick<ActionButtonProps, "disabled" | "children" | "onClick">
> = function ({ disabled, children, onClick }) {
  return (
    <ActionButton disabled={disabled} onClick={onClick}>
      <Profile /> {children}
    </ActionButton>
  );
};

Basic.args = {
  disabled: false,
  children: "Click me",
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
