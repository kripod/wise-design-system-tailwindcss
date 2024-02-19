import type { Meta, StoryObj } from "@storybook/react";

import { Flag } from "./Flag";

const meta = {
  component: Flag,
  tags: ["autodocs"],
  argTypes: {
    intrinsicSize: {
      control: {
        type: "number",
        min: 0,
      },
    },
  },
} satisfies Meta<typeof Flag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    code: "USD",
    intrinsicSize: 64,
  },
} satisfies Story;
