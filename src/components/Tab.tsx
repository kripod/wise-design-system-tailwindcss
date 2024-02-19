import { Tab as TabBase } from "@headlessui/react";

import { Button } from "./buttons/_Button";
import {
  AnimatedLayout,
  AnimatedLayoutGroup,
} from "./experimental/AnimatedLayout";

export type TabGroupProps = {
  initialIndex?: number;
  selectedIndex?: number;
  onChange?: (index: number) => void;
  children: React.ReactNode;
};

export function TabGroup({
  initialIndex = 0,
  selectedIndex,
  onChange,
  children,
}: TabGroupProps) {
  return (
    <AnimatedLayoutGroup>
      <TabBase.Group
        defaultIndex={initialIndex}
        selectedIndex={selectedIndex}
        onChange={onChange}
      >
        {children}
      </TabBase.Group>
    </AnimatedLayoutGroup>
  );
}

export type TabListProps = {
  children: React.ReactNode;
};

export function TabList({ children }: TabListProps) {
  return (
    <TabBase.List className="relative overflow-x-auto whitespace-nowrap">
      <div className="absolute inset-0 border-b" />
      {children}
    </TabBase.List>
  );
}

export type TabProps = {
  disabled?: boolean;
  children: React.ReactNode;
};

export function Tab({ disabled = false, children }: TabProps) {
  return (
    <span className="relative inline-grid h-12 items-center px-6 text-base">
      <TabBase
        as={Button}
        disabled={disabled}
        className="col-start-1 row-start-1 after:absolute after:inset-0 ui-selected:font-semibold ui-selected:tracking-1"
      >
        {({ selected }) => (
          <>
            {children}
            {selected ? (
              <AnimatedLayout id="underline">
                {({ ref }) => (
                  <span
                    ref={ref}
                    className="absolute inset-0 border-b-2 border-interactive-primary"
                  />
                )}
              </AnimatedLayout>
            ) : null}
          </>
        )}
      </TabBase>
      <span className="invisible col-start-1 row-start-1 font-semibold tracking-1">
        {children}
      </span>
    </span>
  );
}

export type TabPanelsProps = {
  children: React.ReactNode;
};

export function TabPanels({ children }: TabPanelsProps) {
  return <TabBase.Panels>{children}</TabBase.Panels>;
}

export type TabPanelProps = {
  children: React.ReactNode;
};

export function TabPanel({ children }: TabPanelProps) {
  return (
    <TabBase.Panel className="transition-shadow focus:outline-none focus-visible:ring">
      {children}
    </TabBase.Panel>
  );
}
