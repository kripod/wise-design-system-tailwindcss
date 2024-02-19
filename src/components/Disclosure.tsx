import { Disclosure as DisclosureBase } from "@headlessui/react";
import { ChevronDown } from "@transferwise/icons";
import type { IconSize } from "@transferwise/icons/lib/types";
import { clsx } from "clsx";

export type DisclosureProps = {
  summary: React.ReactNode;
  icon?: React.ComponentType<{ size?: IconSize }>;
  initialOpen?: boolean;
  children: React.ReactNode;
};

export function Disclosure({
  summary,
  icon: Icon,
  initialOpen = false,
  children,
}: DisclosureProps) {
  return (
    <DisclosureBase
      as="div"
      defaultOpen={initialOpen}
      className="relative flex gap-x-4 p-4 text-content-primary"
    >
      {({ open }) => (
        <>
          {Icon != null ? <Icon size={24} /> : null}
          <div className="w-full space-y-4">
            <DisclosureBase.Button className="flex w-full justify-between gap-x-4 text-lg font-semibold after:absolute after:inset-0 focus:outline-none focus-visible:ring">
              {summary}{" "}
              <ChevronDown
                size={24}
                className={clsx(
                  "text-interactive-primary transition-transform duration-200 motion-reduce:transition-none",
                  open && "-rotate-180",
                )}
              />
            </DisclosureBase.Button>
            <DisclosureBase.Panel className="text-base text-content-secondary">
              {children}
            </DisclosureBase.Panel>
          </div>
        </>
      )}
    </DisclosureBase>
  );
}
