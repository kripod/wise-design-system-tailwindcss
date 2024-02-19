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
  defaultIndex = 0,
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

export function TabList({ stretch = false, children }: TabListProps) {
  return (
    <TabBase.List
      className={clsx(
        "grid h-12 grid-flow-col overflow-x-auto whitespace-nowrap border-0 border-b border-solid border-border-neutral",
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
        "inline-grid text-base",
        selected && "font-semibold tracking-1",
        className,
      )}
      {...restProps}
    >
      <span className="col-start-1 row-start-1">{children}</span>
      <span className="invisible col-start-1 row-start-1 font-semibold tracking-1">
        {children}
      </span>
    </Button>
  );
});

export type TabProps = {
  disabled?: boolean;
  children?: React.ReactNode;
};

export function Tab({ disabled = false, children }: TabProps) {
  return (
    <span className="relative inline-flex items-center justify-center px-6">
      <TabBase
        as={TabButton}
        disabled={disabled}
        className="after:absolute after:inset-0"
        /* TODO: Remove this once focus management is improved in Headless UI */
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          requestAnimationFrame(() => {
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
                    className="absolute inset-0 border-0 border-b-2 border-solid border-interactive-primary"
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
    <TabBase.Panel className="focus-visible:outline">{children}</TabBase.Panel>
  );
}
