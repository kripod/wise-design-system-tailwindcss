import type { Story } from "@ladle/react";

import { ActionButton } from "./buttons/ActionButton";
import { Snackbar } from "./Snackbar";

export const Basic: Story<{
  text: string;
  action: string;
}> = function ({ text, action }) {
  return (
    <Snackbar
      text={text}
      action={action ? <ActionButton>{action}</ActionButton> : null}
    />
  );
};

Basic.args = {
  text: "Role changed",
  action: "Undo",
};
