import type { Story } from "@ladle/react";
import * as React from "react";

import { SearchInput } from "./SearchInput";

export const Basic: Story<{
  size: "sm" | "md";
  shape: "rectangle" | "pill";
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = function ({ size, shape, disabled, onChange }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <SearchInput
      size={size}
      shape={shape}
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
  shape: "pill",
  disabled: false,
};

Basic.argTypes = {
  size: {
    control: { type: "radio" },
    options: ["sm", "md"],
  },
  shape: {
    control: { type: "radio" },
    options: ["rectangle", "pill"],
  },
  onChange: {
    action: "changed",
  },
};
