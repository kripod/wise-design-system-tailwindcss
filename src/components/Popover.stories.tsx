import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

import { ButtonPrimary } from "./buttons/ButtonPrimary";
import { Popover } from "./Popover";

const meta = {
  component: Popover,

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
    onClose: fn(),
  },
  render: function Render({ onClose, ...args }) {
    const [open, setOpen] = useState(true);

    return (
      <Popover
        {...args}
        open={open}
        renderTrigger={({ ref, getInteractionProps }) => (
          <ButtonPrimary
            ref={ref}
            {...getInteractionProps({
              onClick: () => {
                setOpen((prev) => !prev);
              },
            })}
          >
            Toggle popover
          </ButtonPrimary>
        )}
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
      />
    );
  },
} satisfies Story;
