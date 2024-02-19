import type { Meta, StoryObj } from "@storybook/react";
import { fn, type Mock } from "@storybook/test";

import {
  CheckboxChip,
  CheckboxChipGroup,
  type CheckboxChipGroupProps,
  type CheckboxChipProps,
} from "./CheckboxChip";

const meta: Meta<
  CheckboxChipGroupProps & { items: CheckboxChipProps[]; children?: never }
> = {
  title: "components/CheckboxChip",
  component: CheckboxChipGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const CheckboxChipGroupTemplate = {
  render: ({ items, ...args }) => (
    <CheckboxChipGroup {...args}>
      {items.map((item) => (
        <CheckboxChip key={item.name} {...item} />
      ))}
    </CheckboxChipGroup>
  ),
} satisfies Story;

export const Basic = {
  ...CheckboxChipGroupTemplate,
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
