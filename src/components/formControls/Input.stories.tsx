import type { Story } from "@ladle/react";
import { Search } from "@transferwise/icons";
import * as React from "react";

import { ActionButton } from "../buttons/ActionButton";
import { Field } from "./Field";
import { Input, InputAddon, InputGroup } from "./Input";
import { Label } from "./Label";

export const Basic: Story<{
  size: "sm" | "md" | "xl";
  shape: "rectangle" | "pill";
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = function ({ size, shape, required, readOnly, disabled, onChange }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <Field
      label={<>Label</>}
      hint={<>Information message.</>}
      error={value.length === 0 ? <>Error message.</> : undefined}
    >
      <Input
        size={size}
        shape={shape}
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
  size: {
    options: ["sm", "md", "xl"],
    defaultValue: "md",
    control: { type: "radio" },
  },
  shape: {
    options: ["rectangle", "pill"],
    defaultValue: "rectangle",
    control: { type: "radio" },
  },
  onChange: {
    action: "changed",
  },
};

export const WithPrefix: Story<{
  disabled: boolean;
}> = function ({ disabled }) {
  const [value, setValue] = React.useState("Text value");

  return (
    <Label>
      Label
      <InputGroup initialPaddingStart="3rem" disabled={disabled}>
        <InputAddon placement="start">
          <Search size={24} />
        </InputAddon>
        <Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </InputGroup>
    </Label>
  );
};

WithPrefix.args = {
  disabled: false,
};

export const WithSuffix: Story<{
  disabled: boolean;
}> = function ({ disabled }) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("Text value");

  return (
    <Label>
      Label
      <InputGroup initialPaddingEnd="4.75rem" disabled={disabled}>
        <Input
          ref={ref}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <InputAddon placement="end" interactive padding="sm">
          <ActionButton
            onClick={() => {
              navigator.clipboard.writeText(value);
              if (ref.current != null) {
                ref.current.focus({ preventScroll: true });
                ref.current.select();
              }
            }}
          >
            Copy
          </ActionButton>
        </InputAddon>
      </InputGroup>
    </Label>
  );
};

WithSuffix.args = {
  disabled: false,
};
