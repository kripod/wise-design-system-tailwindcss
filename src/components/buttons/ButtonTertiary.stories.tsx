import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ButtonTertiary } from "./ButtonTertiary";

const meta = {
  title: "components/ButtonTertiary",
  component: ButtonTertiary,
} satisfies Meta<typeof ButtonTertiary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    onClick: fn(),
    children: "Click me",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Basic.args,
    disabled: true,
  },
} satisfies Story;

export const AsLink = {
  args: {
    ...Basic.args,
    render: ({ className, children }) => (
      <a
        href="#_"
        className={className}
        onClick={(event) => event.preventDefault()}
      >
        {children}
      </a>
    ),
  },
} satisfies Story;
