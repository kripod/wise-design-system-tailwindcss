import type { Story } from "@ladle/react";
import * as React from "react";

import { Field } from "./Field";
import { TextArea } from "./TextArea";

export const Basic: Story<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  onClick: () => void;
}> = function ({ required, readOnly, disabled }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <Field
      label={<>Label</>}
      hint={<>Information message.</>}
      error={value.length === 0 ? <>Error message.</> : undefined}
    >
      <TextArea
        value={value}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Field>
  );
};

Basic.args = {
  required: true,
  readOnly: false,
  disabled: false,
};
