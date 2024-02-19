import type { Story } from "@ladle/react";
import { Search } from "@transferwise/icons";
import * as React from "react";

import { Field, FieldDescription, Label } from "./Field";
import { Input, InputGroup } from "./Input";

export const Basic: Story<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  onClick: () => void;
}> = function ({ required, readOnly, disabled }) {
  const [value, setValue] = React.useState("Text value");
  return (
    <Field>
      <Label>
        Label
        <Input
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

export const WithPrefix: Story<{
  disabled: boolean;
  onClick: () => void;
}> = function ({ disabled }) {
  const [value, setValue] = React.useState("Text value");
  return (
    <Label>
      Label
      <InputGroup
        prefix={
          <span className="px-4">
            <Search size={24} />
          </span>
        }
        prefixWidth="3rem"
      >
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
