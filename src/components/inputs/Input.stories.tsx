import type { Story } from "@ladle/react";
import * as React from "react";

import { Input } from "./Input";

export const Basic: Story<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  onClick: () => void;
}> = function ({ required, readOnly, disabled }) {
  const [value, setValue] = React.useState("Text value");
  return (
    <Input
      value={value}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
};

Basic.args = {
  required: true,
  readOnly: false,
  disabled: false,
};
