import { Tab as TabBase } from "@headlessui/react";
import { clsx } from "clsx/lite";
import * as React from "react";

import { parseBooleanish } from "../utils/parseBooleanish";
import { AnimatedLayout, AnimatedLayoutGroup } from "./AnimatedLayout";
import { Button } from "./buttons/_Button";

export interface TabGroupProps {
  defaultIndex?: number;
  selectedIndex?: number;
  children?: React.ReactNode;
  onChange?: (index: number) => void;
}

export function TabGroup({
  defaultIndex,
  selectedIndex,
  children,
  onChange,
}: TabGroupProps) {
  return (
    <AnimatedLayoutGroup>
      <TabBase.Group
        defaultIndex={defaultIndex}
        selectedIndex={selectedIndex}
        onChange={onChange}
      >
        {children}
      </TabBase.Group>
    </AnimatedLayoutGroup>
  );
}

export interface TabListProps {
  stretch?: boolean;
  children?: React.ReactNode;
}

export function TabList({ stretch, children }: TabListProps) {
  return (
    <TabBase.List
      className={clsx(
        "grid min-h-12 grid-flow-col overflow-x-auto border-b",
        stretch ? "auto-cols-fr" : "auto-cols-max",
      )}
    >
      {children}
    </TabBase.List>
  );
}

interface TabButtonProps extends React.ComponentPropsWithRef<"button"> {}

const TabButton = React.forwardRef(function TabButton(
  {
    "aria-selected": ariaSelected = false,
    className,
    children,
    ...restProps
  }: TabButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const selected = parseBooleanish(ariaSelected);
  return (
    <Button
      ref={ref}
      role="tab"
      aria-selected={ariaSelected}
      className={clsx(
        className,
        "inline-grid rounded-xs text-body-lg *:col-start-1 *:row-start-1",
        selected
          ? "font-semibold text-interactive-primary"
          : "text-content-secondary",
      )}
      {...restProps}
    >
      <span>{children}</span>
      <span className="invisible font-semibold">{children}</span>
    </Button>
  );
});

export interface TabProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Tab({ disabled, children }: TabProps) {
  return (
    <span className="relative inline-flex items-center justify-center px-6">
      <TabBase
        as={TabButton}
        disabled={disabled}
        className="after:absolute after:inset-0"
        /* TODO: Remove this once focus management is improved in Headless UI */
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          queueMicrotask(() => {
            if (event.target instanceof HTMLElement) {
              event.target.blur();
            }
          });
        }}
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
    </span>
  );
}

export interface TabPanelsProps {
  children?: React.ReactNode;
}

export function TabPanels({ children }: TabPanelsProps) {
  return <TabBase.Panels>{children}</TabBase.Panels>;
}

export interface TabPanelProps {
  children?: React.ReactNode;
}

export function TabPanel({ children }: TabPanelProps) {
  return (
    <TabBase.Panel className="rounded-xs focus-visible:outline">
      {children}
    </TabBase.Panel>
  );
}
