import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";
import { useState } from "react";

import { SearchInput } from "./SearchInput";

const meta = {
  title: "components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchInput>;
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
    const [value, setValue] = useState("Text value");

    return (
      <SearchInput
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
