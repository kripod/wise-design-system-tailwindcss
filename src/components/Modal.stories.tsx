import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Modal } from "./Modal";

const meta = {
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    open: false,
    title: "Change this user’s role?",
    children: "Content goes here",
    onClose: fn(),
  },
} satisfies Story;
