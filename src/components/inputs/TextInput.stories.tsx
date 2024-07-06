import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

import { TextInput } from "./TextInput";

const meta = {
  title: "components/TextInput",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    defaultValue: "Text value",
    onChange: fn(),
  },
} satisfies Story;

export const Controlled = {
  args: {
    onChange: fn(),
  },
  render: function Render({ onChange, ...args }) {
    const [value, setValue] = useState("Text value");

    return (
      <TextInput
        {...args}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          onChange?.(event);
        }}
      />
    );
  },
} satisfies Story;
