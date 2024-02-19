import type { Story } from "@ladle/react";

import { Alert } from "./Alert";

export const Basic: Story<{
  sentiment: "neutral" | "negative" | "positive" | "warning";
  description: string;
  action: string;
  unclosable: boolean;
  onClose: () => void;
}> = function ({ sentiment, description, action, unclosable, onClose }) {
  return (
    <Alert
      sentiment={sentiment}
      description={description}
      action={
        action ? (
          /* TODO: Consider creating an `Alert.Link` component */
          <a href="#_" className="font-semibold underline underline-offset-3">
            {action}
          </a>
        ) : null
      }
      onClose={!unclosable ? onClose : undefined}
    />
  );
};

Basic.args = {
  sentiment: "neutral",
  description:
    "Payments sent to your bank details today might not arrive in time for the holidays.",
  action: "Learn more",
  unclosable: false,
};

Basic.argTypes = {
  sentiment: {
    control: { type: "radio" },
    options: ["neutral", "negative", "positive", "warning"],
  },
  onClose: {
    action: "closed",
  },
};
