import type { Story } from "@ladle/react";
import * as React from "react";

import { Field } from "./Field";
import { TextAreaInput } from "./TextAreaInput";

export const Basic: Story<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}> = function ({ required, readOnly, disabled, onChange }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <Field
      label={<>Label</>}
      hint={<>Information message.</>}
      error={value.length === 0 ? <>Error message.</> : undefined}
    >
      <TextAreaInput
        value={value}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          onChange(event);
        }}
      />
    </Field>
  );
};

Basic.args = {
  required: true,
  readOnly: false,
  disabled: false,
};

Basic.argTypes = {
  onChange: {
    action: "changed",
  },
};
