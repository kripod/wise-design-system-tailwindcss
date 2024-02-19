import { Tab as TabBase } from "@headlessui/react";
import { clsx } from "clsx";
import * as React from "react";

import { parseBooleanish } from "../parseBooleanish";
import { Button } from "./buttons/_Button";
import {
  AnimatedLayout,
  AnimatedLayoutGroup,
} from "./experimental/AnimatedLayout";

export type TabGroupProps = {
  defaultIndex?: number;
  selectedIndex?: number;
  children?: React.ReactNode;
  onChange?: (index: number) => void;
};

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

export type TabListProps = {
  stretch?: boolean;
  children?: React.ReactNode;
};

export function TabList({ stretch, children }: TabListProps) {
  return (
    <TabBase.List
      className={clsx(
        "grid h-12 grid-flow-col overflow-x-auto whitespace-nowrap border-b",
        !stretch && "justify-start",
      )}
    >
      {children}
    </TabBase.List>
  );
}

type TabButtonProps = React.ComponentPropsWithRef<"button">;

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
      aria-selected={ariaSelected}
      className={clsx(
        "inline-grid rounded-xs text-base [&>*]:col-start-1 [&>*]:row-start-1",
        selected
          ? "font-semibold text-interactive-primary"
          : "text-content-secondary",
        className,
      )}
      {...restProps}
    >
      <span>{children}</span>
      <span className="invisible font-semibold">{children}</span>
    </Button>
  );
});

export type TabProps = {
  disabled?: boolean;
  children?: React.ReactNode;
};

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

export type TabPanelsProps = {
  children?: React.ReactNode;
};

export function TabPanels({ children }: TabPanelsProps) {
  return <TabBase.Panels>{children}</TabBase.Panels>;
}

export type TabPanelProps = {
  children?: React.ReactNode;
};

export function TabPanel({ children }: TabPanelProps) {
  return (
    <TabBase.Panel className="rounded-xs focus-visible:outline">
      {children}
    </TabBase.Panel>
  );
}
