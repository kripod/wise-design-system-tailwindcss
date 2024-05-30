import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";

import {
  ChipCheckbox,
  ChipCheckboxGroup,
  type ChipCheckboxGroupProps,
  type ChipCheckboxProps,
} from "./ChipCheckbox";

const meta: Meta<
  ChipCheckboxGroupProps & { items: ChipCheckboxProps[]; children?: never }
> = {
  title: "components/ChipCheckbox",
  component: ChipCheckboxGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const ChipCheckboxGroupTemplate = {
  render: ({ items, ...args }) => (
    <ChipCheckboxGroup {...args}>
      {items.map((item) => (
        <ChipCheckbox key={item.name} {...item} />
      ))}
    </ChipCheckboxGroup>
  ),
} satisfies Story;

export const Basic = {
  ...ChipCheckboxGroupTemplate,
  args: {
    items: [
      {
        name: "accounting",
        defaultChecked: true,
        onChange: fn() satisfies Mock,
        children: "Accounting",
      },
      {
        name: "payroll",
        onChange: fn() satisfies Mock,
        children: "Payroll",
      },
      {
        name: "reporting",
        onChange: fn() satisfies Mock,
        children: "Reporting",
      },
      {
        name: "payments",
        disabled: true,
        onChange: fn() satisfies Mock,
        children: "Payments",
      },
    ],
  },
} satisfies Story;
