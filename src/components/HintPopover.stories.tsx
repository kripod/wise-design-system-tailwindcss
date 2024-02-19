import type { Meta, StoryObj } from "@storybook/react";

import { HintPopover } from "./HintPopover";

const meta = {
  component: HintPopover,
  tags: ["autodocs"],
} satisfies Meta<typeof HintPopover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    label: "Brief label",
    children: "Further information explained in detail.",
  },
} satisfies Story;
