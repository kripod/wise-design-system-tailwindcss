import {
  Tab,
  TabGroup,
  TabList,
  TabListProps,
  TabPanel,
  TabPanels,
} from "./Tab";

export const Basic = function ({ stretch }: Pick<TabListProps, "stretch">) {
  return (
    <TabGroup>
      <TabList stretch={stretch}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        <Tab disabled>Tab 4</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

Basic.args = {
  stretch: false,
};
