import type { Meta, StoryObj } from "@storybook/react";

import { ActionButton } from "./buttons/ActionButton";
import { Snackbar } from "./Snackbar";

const meta = {
  component: Snackbar,
  tags: ["autodocs"],
  argTypes: {
    action: {
      options: ["button"],
      mapping: {
        button: <ActionButton>Undo</ActionButton>,
      },
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    text: "Role changed",
    action: "button",
  },
} satisfies Story;
