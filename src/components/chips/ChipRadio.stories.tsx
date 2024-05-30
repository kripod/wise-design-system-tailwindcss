import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";

import {
  ChipRadio,
  ChipRadioGroup,
  type ChipRadioGroupProps,
  type ChipRadioProps,
} from "./ChipRadio";

const meta: Meta<
  ChipRadioGroupProps & { items: ChipRadioProps[]; children?: never }
> = {
  title: "components/ChipRadio",
  component: ChipRadioGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const ChipRadioGroupTemplate = {
  render: ({ items, ...args }) => (
    <ChipRadioGroup {...args}>
      {items.map((item) => (
        <ChipRadio key={item.value} {...item} />
      ))}
    </ChipRadioGroup>
  ),
} satisfies Story;

export const Basic = {
  ...ChipRadioGroupTemplate,
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
