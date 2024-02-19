import type { Story } from "@ladle/react";
import { Search } from "@transferwise/icons";
import * as React from "react";

import { Field, FieldDescription, Label } from "./Field";
import { Input, InputAddon, InputGroup } from "./Input";

export const Basic: Story<{
  size: "sm" | "md" | "lg" | "xl";
  shape: "rectangle" | "pill";
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  onClick: () => void;
}> = function ({ size, shape, required, readOnly, disabled }) {
  const [value, setValue] = React.useState("Text value");
  return (
    <Field>
      <Label>
        Label
        <Input
          size={size}
          shape={shape}
          value={value}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Label>
      {value.length > 0 ? (
        <FieldDescription>Information message.</FieldDescription>
      ) : (
        <FieldDescription sentiment="negative">Error message.</FieldDescription>
      )}
    </Field>
  );
};

Basic.args = {
  required: true,
  readOnly: false,
  disabled: false,
};

Basic.argTypes = {
  size: {
    options: ["sm", "md", "lg", "xl"],
    defaultValue: "md",
    control: { type: "radio" },
  },
  shape: {
    options: ["rectangle", "pill"],
    defaultValue: "rectangle",
    control: { type: "radio" },
  },
};

export const WithPrefix: Story<{
  disabled: boolean;
  onClick: () => void;
}> = function ({ disabled }) {
  const [value, setValue] = React.useState("Text value");
  return (
    <Label>
      Label
      <InputGroup initialPaddingStart="3rem">
        <InputAddon>
          <Search size={24} />
        </InputAddon>
        <Input
          value={value}
          disabled={disabled}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </InputGroup>
    </Label>
  );
};

WithPrefix.args = {
  disabled: false,
};
