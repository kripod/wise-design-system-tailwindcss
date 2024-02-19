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
      className="relative flex flex-col gap-y-4 p-4 text-content-primary"
    >
      {({ open }) => (
        <>
          <DisclosureBase.Button
            className="flex gap-x-4 text-lg font-semibold after:absolute after:inset-0 focus:outline-none focus-visible:ring"
            style={{
              textAlign: "start", // TODO: Replace with `text-start`
            }}
          >
            {icon} <span className="flex-1">{summary}</span>{" "}
            <ChevronDown
              size={24}
              className={clsx(
                "text-interactive-primary transition-transform duration-200 motion-reduce:transition-none",
                open && "-rotate-180",
              )}
            />
          </DisclosureBase.Button>
          <DisclosureBase.Panel className="relative -m-4 mt-0 flex gap-x-4 p-4 pt-0 text-base text-content-secondary">
            {icon != null ? <span className="invisible">{icon}</span> : null}
            <div className="flex-1">{children}</div>
          </DisclosureBase.Panel>
        </>
      )}
    </DisclosureBase>
  );
}
