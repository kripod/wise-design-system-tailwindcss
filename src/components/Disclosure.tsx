import {
  Disclosure as DisclosureBase,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown } from "@transferwise/icons";
import { clsx } from "clsx/lite";

import { Button } from "./buttons/_Button";

export interface DisclosureProps {
  summary: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

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
      <DisclosureButton
        as={Button}
        className="relative flex gap-x-4 rounded-xs text-start text-title-body text-content-primary after:absolute after:inset-0 after:-my-4"
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
      </DisclosureButton>
      <DisclosurePanel className="flex gap-x-4 text-body-lg text-content-secondary">
        {icon ? <span className="invisible">{icon}</span> : null}
        <div className="flex-1">{children}</div>
      </DisclosurePanel>
    </DisclosureBase>
  );
}
