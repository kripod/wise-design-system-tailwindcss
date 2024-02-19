import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";

import {
  RadioChip,
  RadioChipGroup,
  type RadioChipGroupProps,
  type RadioChipProps,
} from "./RadioChip";

const meta: Meta<
  RadioChipGroupProps & { items: RadioChipProps[]; children?: never }
> = {
  title: "components/RadioChip",
  component: RadioChipGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const RadioChipGroupTemplate = {
  render: ({ items, ...args }) => (
    <RadioChipGroup {...args}>
      {items.map((item) => (
        <RadioChip key={item.value} {...item} />
      ))}
    </RadioChipGroup>
  ),
} satisfies Story;

export const Basic = {
  ...RadioChipGroupTemplate,
  args: {
    defaultValue: "100",
    items: [
      { value: "100", children: "100 GBP" },
      { value: "200", children: "200 GBP" },
      { value: "300", children: "300 GBP" },
      { value: "400+", disabled: true, children: "400+ GBP" },
    ],
    onChange: fn() satisfies Mock,
  },
} satisfies Story;
