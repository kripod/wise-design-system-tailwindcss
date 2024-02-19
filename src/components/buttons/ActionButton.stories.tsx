import type { Story } from "@ladle/react";
import { Profile } from "@transferwise/icons";

import { ActionButton } from "./ActionButton";

export const Basic: Story<{
  contents: string;
  disabled: boolean;
  onClick: () => void;
}> = function ({ contents, disabled, onClick }) {
  return (
    <ActionButton disabled={disabled} onClick={onClick}>
      <Profile /> {contents}
    </ActionButton>
  );
};

Basic.args = {
  contents: "Click me",
  disabled: false,
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
