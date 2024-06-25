import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BottomSheet } from "./BottomSheet";

const meta = {
  component: BottomSheet,
  tags: ["autodocs"],
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    open: false,
    title: "Title goes here",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ".repeat(
        10,
      ),
    onClose: fn(),
  },
} satisfies Story;
