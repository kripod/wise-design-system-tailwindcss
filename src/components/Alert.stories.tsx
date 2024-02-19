import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";

import { Alert } from "./Alert";
import { ActionButton } from "./buttons/ActionButton";
import { InlineLink } from "./InlineLink";

const meta = {
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    action: {
      options: ["none", "link", "button"],
      mapping: {
        none: null,
        link: (
          <InlineLink href="#_" onClick={(event) => event.preventDefault()}>
            Action
          </InlineLink>
        ),
        button: (
          // TODO: Make secondary
          <ActionButton>Action</ActionButton>
        ),
      },
    },
  },
} satisfies Meta<typeof Alert>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    sentiment: "neutral",
    description:
      "Payments sent to your bank details today might not arrive in time for the holidays.",
  },
} satisfies Story;

export const WithClose = {
  args: {
    ...Basic.args,
    onClose: fn() satisfies Mock,
  },
} satisfies Story;

export const WithAction = {
  args: {
    ...Basic.args,
    action: "link",
  },
} satisfies Story;
