import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";

import { PrimaryButton } from "./PrimaryButton";

const meta = {
  title: "components/PrimaryButton",
  component: PrimaryButton,
  tags: ["autodocs"],
} satisfies Meta<typeof PrimaryButton>;
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
