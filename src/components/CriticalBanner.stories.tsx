import type { Story } from "@ladle/react";

import { PrimaryButton } from "../index-canary";
import { CriticalBanner } from "./CriticalBanner";

export const Basic: Story<{
  title: string;
  description: string;
  buttonText: string;
}> = function ({ title, description, buttonText }) {
  return (
    <CriticalBanner
      title={title}
      description={description}
      action={<PrimaryButton>{buttonText}</PrimaryButton>}
    />
  );
};

Basic.args = {
  title: "Title.",
  description: "Description text if necessary. Avoid if possible.",
  buttonText: "Click me",
};
