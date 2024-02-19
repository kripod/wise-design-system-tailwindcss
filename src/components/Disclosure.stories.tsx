import type { Story } from "@ladle/react";
import { Bank } from "@transferwise/icons";

import { Disclosure, DisclosureProps } from "./Disclosure";

export const Basic: Story<
  Pick<DisclosureProps, "summary" | "initialOpen" | "children"> & {
    showIcon?: boolean;
  }
> = function ({ summary, showIcon, initialOpen, children }) {
  return (
    <Disclosure
      summary={summary}
      icon={showIcon ? Bank : undefined}
      initialOpen={initialOpen}
    >
      {children}
    </Disclosure>
  );
};

Basic.args = {
  summary: "It will be faster to pay in at your bank branch",
  showIcon: false,
  initialOpen: false,
  children:
    "The fastest way to send 30,000 GBP to is by branch. Daily bank limits are around 25,000 GBP meaning it would take longer to pay with a series of transfers.",
};
