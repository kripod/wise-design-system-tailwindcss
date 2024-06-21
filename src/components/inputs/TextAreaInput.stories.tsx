import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

import { TextAreaInput } from "./TextAreaInput";

const meta = {
  title: "components/TextAreaInput",
  component: TextAreaInput,
  tags: ["autodocs"],
} satisfies Meta<typeof TextAreaInput>;
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
      <TextAreaInput
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
