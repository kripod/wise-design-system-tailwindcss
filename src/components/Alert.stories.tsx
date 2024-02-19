import type { Story } from "@ladle/react";

import { Alert } from "./Alert";

export const Basic: Story<{
  contents: string;
  sentiment: "neutral" | "negative" | "positive" | "warning";
  unclosable: boolean;
  onClose: () => void;
}> = function ({ contents, sentiment, unclosable, onClose }) {
  return (
    <Alert sentiment={sentiment} onClose={!unclosable ? onClose : undefined}>
      {contents}
    </Alert>
  );
};

Basic.args = {
  contents:
    "Payments sent to your bank details today might not arrive in time for the holidays.",
  unclosable: false,
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
