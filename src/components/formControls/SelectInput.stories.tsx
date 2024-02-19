import type { Story } from "@ladle/react";
import * as React from "react";

import { SelectInput } from "./SelectInput";

export const Basic: Story<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
}> = function ({ required, readOnly, disabled }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <div className="flex flex-col">
      <SelectInput />
    </div>
  );
};

Basic.args = {
  required: true,
  readOnly: false,
  disabled: false,
};
