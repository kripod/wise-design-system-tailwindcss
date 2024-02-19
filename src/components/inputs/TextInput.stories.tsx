import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";
import * as React from "react";

import { TextInput } from "./TextInput";

const meta = {
  title: "components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
} satisfies Meta<typeof TextInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    defaultValue: "Text value",
    onChange: fn() satisfies Mock,
  },
} satisfies Story;

export const Controlled = {
  args: {
    onChange: fn() satisfies Mock,
  },
  render: function Render({ onChange, ...args }) {
    const [value, setValue] = React.useState("Text value");

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
