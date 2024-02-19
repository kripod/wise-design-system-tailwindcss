import type { Story } from "@ladle/react";
import * as React from "react";

import { SearchInput } from "./SearchInput";

export const Basic: Story<{
  size: "sm" | "md";
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = function ({ size, disabled, onChange }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <SearchInput
      size={size}
      value={value}
      disabled={disabled}
      onChange={(event) => {
        setValue(event.currentTarget.value);
        onChange(event);
      }}
    />
  );
};

Basic.args = {
  size: "md",
  disabled: false,
};

Basic.argTypes = {
  size: {
    control: { type: "radio" },
    options: ["sm", "md"],
  },
  onChange: {
    action: "changed",
  },
};
