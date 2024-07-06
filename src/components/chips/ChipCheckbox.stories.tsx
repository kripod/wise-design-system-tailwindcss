import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

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
};

export default meta;
type Story = StoryObj<typeof meta>;

const ChipCheckboxGroupTemplate = {
  render: ({ items, ...args }) => (
    <ChipCheckboxGroup {...args}>
      {items.map((item) => (
        <ChipCheckbox key={item.value} {...item} />
      ))}
    </ChipCheckboxGroup>
  ),
} satisfies Story;

export const Basic = {
  ...ChipCheckboxGroupTemplate,
  args: {
    defaultValue: ["accounting"],
    items: [
      {
        value: "accounting",
        children: "Accounting",
      },
      {
        value: "payroll",
        children: "Payroll",
      },
      {
        value: "reporting",
        children: "Reporting",
      },
      {
        value: "payments",
        disabled: true,
        children: "Payments",
      },
    ],
    onChange: fn(),
  },
} satisfies Story;
