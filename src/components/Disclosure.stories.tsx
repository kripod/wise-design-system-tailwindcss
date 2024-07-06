import type { Meta, StoryObj } from "@storybook/react";
import { Bank } from "@transferwise/icons";

import { Disclosure } from "./Disclosure";

const meta = {
  component: Disclosure,
  argTypes: {
    icon: {
      options: ["none", "bank"],
      mapping: {
        none: null,
        bank: <Bank size={24} />,
      },
    },
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    summary: "It will be faster to pay in at your bank branch",
    children:
      "The fastest way to send 30,000 GBP to is by branch. Daily bank limits are around 25,000 GBP meaning it would take longer to pay with a series of transfers.",
  },
} satisfies Story;

export const WithIcon = {
  args: {
    ...Basic.args,
    icon: "bank",
  },
} satisfies Story;

export const OpenByDefault = {
  args: {
    ...Basic.args,
    defaultOpen: true,
  },
} satisfies Story;
