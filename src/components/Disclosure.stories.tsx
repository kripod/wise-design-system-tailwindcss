import type { Story } from "@ladle/react";
import { Bank } from "@transferwise/icons";

import { Disclosure } from "./Disclosure";

export const Basic: Story<{
  summary: string;
  contents: string;
  showIcon: boolean;
  defaultOpen: boolean;
}> = function ({ summary, contents, showIcon, defaultOpen }) {
  return (
    <Disclosure
      summary={summary}
      icon={showIcon ? <Bank size={24} /> : undefined}
      defaultOpen={defaultOpen}
    >
      {contents}
    </Disclosure>
  );
};

Basic.args = {
  summary: "It will be faster to pay in at your bank branch",
  contents:
    "The fastest way to send 30,000 GBP to is by branch. Daily bank limits are around 25,000 GBP meaning it would take longer to pay with a series of transfers.",
  showIcon: false,
  defaultOpen: false,
};
