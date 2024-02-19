import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "./Tabs";

export const Basic = function ({
  defaultIndex,
  stretch,
}: {
  defaultIndex: number;
  stretch: boolean;
}) {
  return (
    <TabGroup defaultIndex={defaultIndex}>
      <TabList stretch={stretch}>
        <Tab>Tab with long title</Tab>
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
  defaultIndex: 0,
  stretch: false,
};
