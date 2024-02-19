import type { Story } from "@ladle/react";
import * as React from "react";

import { Field, FieldDescription, Label } from "./Field";
import { TextArea } from "./TextArea";

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
        <TextArea
          value={value}
          required={required}
          aria-invalid={value.length === 0}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Label>
      <FieldDescription>
        {value.length > 0 ? <>Information message.</> : <>Error message.</>}
      </FieldDescription>
    </Field>
  );
};

Basic.args = {
  required: true,
  readOnly: false,
  disabled: false,
};
