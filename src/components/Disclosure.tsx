import { Disclosure as DisclosureBase } from "@headlessui/react";
import { ChevronDown } from "@transferwise/icons";
import { clsx } from "clsx";

export type DisclosureProps = {
  summary: React.ReactNode;
  icon?: React.ReactNode;
  initialOpen?: boolean;
  children: React.ReactNode;
};

export function Disclosure({
  summary,
  icon,
  initialOpen = false,
  children,
}: DisclosureProps) {
  return (
    <DisclosureBase
      as="div"
      defaultOpen={initialOpen}
      className="relative space-y-4 p-4 text-content-primary"
    >
      {({ open }) => (
        <>
          <DisclosureBase.Button
            className="flex w-full gap-x-4 text-lg font-semibold after:absolute after:inset-0 focus:outline-none focus-visible:ring"
            style={{
              textAlign: "start", // TODO: Replace with `text-start`
            }}
          >
            {icon} <span className="w-full">{summary}</span>{" "}
            <ChevronDown
              size={24}
              className={clsx(
                "text-interactive-primary transition-transform duration-200 motion-reduce:transition-none",
                open && "-rotate-180",
              )}
            />
          </DisclosureBase.Button>
          <DisclosureBase.Panel className="relative flex gap-x-4 text-base text-content-secondary">
            {icon != null ? <span className="invisible">{icon}</span> : null}
            {children}
          </DisclosureBase.Panel>
        </>
      )}
    </DisclosureBase>
  );
}
