import type { Story } from "@ladle/react";

import { Alert, AlertProps } from "./Alert";

export const Basic: Story<AlertProps> = ({ sentiment, onClose, children }) => (
  <Alert sentiment={sentiment} onClose={onClose}>
    {children}
  </Alert>
);

Basic.args = {
  disabled: false,
  children:
    "Payments sent to your bank details today might not arrive in time for the holidays.",
};

Basic.argTypes = {
  sentiment: {
    options: ["neutral", "negative"],
    defaultValue: "neutral",
    control: { type: "radio" },
  },
  onClose: {
    action: "closed",
  },
};
