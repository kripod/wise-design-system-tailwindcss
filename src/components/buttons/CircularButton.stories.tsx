import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Plus } from "@transferwise/icons";

import { CircularButton } from "./CircularButton";

const meta = {
  title: "components/CircularButton",
  component: CircularButton,

  argTypes: {
    icon: {
      options: ["plus"],
      mapping: {
        plus: <Plus size={24} />,
      },
    },
  },
} satisfies Meta<typeof CircularButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    icon: "plus",
    children: "Add money",
    onClick: fn(),
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Basic.args,
    disabled: true,
  },
} satisfies Story;
