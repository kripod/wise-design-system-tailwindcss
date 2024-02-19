import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";

import { SecondaryButton } from "./SecondaryButton";

const meta = {
  title: "components/SecondaryButton",
  component: SecondaryButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SecondaryButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    onClick: fn() satisfies Mock,
    children: "Click me",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Basic.args,
    disabled: true,
  },
} satisfies Story;
