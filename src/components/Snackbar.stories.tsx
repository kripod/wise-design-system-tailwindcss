import type { Story } from "@ladle/react";

import { ActionButton } from "../index-canary";
import { Snackbar } from "./Snackbar";

export const Basic: Story<{
  text: string;
  action: string;
}> = function ({ text, action }) {
  return (
    <Snackbar action={action ? <ActionButton>{action}</ActionButton> : null}>
      {text}
    </Snackbar>
  );
};

Basic.args = {
  text: "Role changed",
  action: "Undo",
};
