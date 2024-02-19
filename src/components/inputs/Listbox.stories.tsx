import type { Story } from "@ladle/react";
import * as React from "react";

import { Field, FieldDescription, Label } from "./Field";
import { Listbox } from "./Listbox";

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
        <Listbox />
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
