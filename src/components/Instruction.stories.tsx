import type { Meta, StoryObj } from "@storybook/react";

import { InlineLink } from "./InlineLink";
import {
  Instruction,
  InstructionList,
  type InstructionListProps,
  type InstructionProps,
} from "./Instruction";

const meta: Meta<
  InstructionListProps & { items: InstructionProps[]; children?: never }
> = {
  component: InstructionList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const InstructionListTemplate = {
  render: ({ items, ...args }) => (
    <InstructionList {...args}>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Instruction key={index} {...item} />
      ))}
    </InstructionList>
  ),
} satisfies Story;

export const Basic = {
  ...InstructionListTemplate,
  args: {
    items: [
      {
        sentiment: "positive",
        children: "Do an initial money transfer",
      },
      {
        sentiment: "positive",
        children: "Invite at least 3 friends",
      },
      {
        sentiment: "positive",
        children: "Convince them to use this amazing product",
      },
      {
        sentiment: "negative",
        children: (
          <>
            Paying extra <InlineLink as="button">hidden fees</InlineLink> for
            transfers
          </>
        ),
      },
      {
        sentiment: "negative",
        children: "Use bad exchange rate",
      },
    ],
  },
} satisfies Story;
