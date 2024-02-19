import type { Story } from "@ladle/react";
import * as React from "react";

import { Listbox } from "./Listbox";

export const Basic: Story<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  onClick: () => void;
}> = function ({ required, readOnly, disabled }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <div className="flex flex-col">
      <Listbox />
    </div>
  );
};

Basic.args = {
  required: true,
  readOnly: false,
  disabled: false,
};
