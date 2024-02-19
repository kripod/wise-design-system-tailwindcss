import type { Story } from "@ladle/react";

import { Alert } from "./Alert";

export const Basic: Story<{
  text: string;
  sentiment: "neutral" | "negative" | "positive" | "warning";
  unclosable: boolean;
  onClose: () => void;
}> = function ({ text, sentiment, unclosable, onClose }) {
  return (
    <Alert sentiment={sentiment} onClose={!unclosable ? onClose : undefined}>
      {text}
      {/* TODO: Consider creating an `Alert.Link` component */}
      <a href="#_" className="font-semibold underline underline-offset-3">
        Learn more
      </a>
    </Alert>
  );
};

Basic.args = {
  text: "Payments sent to your bank details today might not arrive in time for the holidays.",
  unclosable: false,
};

Basic.argTypes = {
  sentiment: {
    options: ["neutral", "negative", "positive", "warning"],
    defaultValue: "neutral",
    control: { type: "radio" },
  },
  onClose: {
    action: "closed",
  },
};
