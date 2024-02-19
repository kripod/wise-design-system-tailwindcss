import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";
import * as React from "react";

import { PrimaryButton } from "./buttons/PrimaryButton";
import { Popover } from "./Popover";

const meta = {
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    open: { table: { disable: true } },
    renderTrigger: { table: { disable: true } },
  },
} satisfies Meta<typeof Popover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    open: false,
    renderTrigger: () => null,
    title: "Guaranteed rate",
    children:
      "You’ll get this rate as long as we receive your 10 EUR within the next 51 hours.",
    onClose: fn() satisfies Mock,
  },
  render: function Render({ onClose, ...args }) {
    const [open, setOpen] = React.useState(true);

    return (
      <Popover
        {...args}
        open={open}
        renderTrigger={({ ref, getInteractionProps }) => (
          <PrimaryButton
            ref={ref}
            {...getInteractionProps({
              onClick: () => {
                setOpen((prev) => !prev);
              },
            })}
          >
            Toggle popover
          </PrimaryButton>
        )}
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
      />
    );
  },
} satisfies Story;
