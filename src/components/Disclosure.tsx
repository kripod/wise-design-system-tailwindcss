import { Disclosure as DisclosureBase } from "@headlessui/react";
import { ChevronDown } from "@transferwise/icons";
import { clsx } from "clsx";

import { Button } from "./buttons/_Button";

export type DisclosureProps = {
  summary: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children?: React.ReactNode;
};

export function Disclosure({
  summary,
  icon,
  defaultOpen,
  children,
}: DisclosureProps) {
  return (
    <DisclosureBase
      as="div"
      defaultOpen={defaultOpen}
      className="flex flex-col gap-y-4 py-4"
    >
      <DisclosureBase.Button
        as={Button}
        className="relative flex gap-x-4 rounded-xs text-start text-lg text-content-primary after:absolute after:inset-0 after:-my-4"
      >
        {({ open }) => (
          <>
            {icon}
            <span className="flex-1">{summary}</span>
            <ChevronDown
              size={24}
              className={clsx(
                "text-interactive-primary transition-transform duration-200 motion-reduce:transition-none",
                open && "-rotate-180",
              )}
            />
          </>
        )}
      </DisclosureBase.Button>
      <DisclosureBase.Panel className="flex gap-x-4 text-base text-content-secondary">
        {icon != null ? <span className="invisible">{icon}</span> : null}
        <div className="flex-1">{children}</div>
      </DisclosureBase.Panel>
    </DisclosureBase>
  );
}
