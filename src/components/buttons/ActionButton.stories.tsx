import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";
import { Profile } from "@transferwise/icons";

import { ActionButton } from "./ActionButton";

const meta = {
  title: "components/ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      options: ["none", "profile"],
      mapping: {
        none: null,
        profile: <Profile size={16} />,
      },
    },
  },
} satisfies Meta<typeof ActionButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    children: "Click me",
    onClick: fn() satisfies Mock,
  },
} satisfies Story;

export const WithIcon = {
  args: {
    ...Basic.args,
    icon: "profile",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Basic.args,
    disabled: true,
  },
} satisfies Story;
