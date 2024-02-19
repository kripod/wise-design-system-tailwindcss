import type { Story } from "@ladle/react";

import { Alert, AlertProps } from "./Alert";

export const Basic: Story<AlertProps & { unclosable?: boolean }> = function ({
  sentiment,
  unclosable,
  onClose,
  children,
}) {
  return (
    <Alert sentiment={sentiment} onClose={!unclosable ? onClose : undefined}>
      {children}
    </Alert>
  );
};

Basic.args = {
  unclosable: false,
  children:
    "Payments sent to your bank details today might not arrive in time for the holidays.",
};

Basic.argTypes = {
  sentiment: {
    options: ["neutral", "positive", "negative", "warning"],
    defaultValue: "neutral",
    control: { type: "radio" },
  },
  onClose: {
    action: "closed",
  },
};
