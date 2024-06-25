import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import {
  Tab,
  TabGroup,
  type TabGroupProps,
  TabList,
  TabPanel,
  TabPanels,
  type TabProps,
} from "./Tabs";

const meta: Meta<
  TabGroupProps & {
    stretchTabList?: boolean;
    items: (TabProps & { label: React.ReactNode })[];
    children?: never;
  }
> = {
  component: TabGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TabGroupTemplate = {
  render: ({ stretchTabList, items, ...args }) => (
    <TabGroup {...args}>
      <TabList stretch={stretchTabList}>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tab key={index} disabled={item.disabled}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TabPanel key={index}>{item.children}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  ),
} satisfies Story;

export const Basic = {
  ...TabGroupTemplate,
  args: {
    items: [
      { label: "Tab with long title", children: "Content 1" },
      { label: "Tab 2", children: "Content 2" },
      { label: "Tab 3", children: "Content 3" },
      { label: "Tab 4", disabled: true },
    ],
    onChange: fn(),
  },
} satisfies Story;

export const StretchedTabList = {
  ...TabGroupTemplate,
  args: {
    ...Basic.args,
    stretchTabList: true,
  },
} satisfies Story;
