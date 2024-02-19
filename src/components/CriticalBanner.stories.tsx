import type { Story } from "@ladle/react";

import { CriticalBannerPrimaryButton } from "./buttons/PrimaryButton";
import { CriticalBanner } from "./CriticalBanner";

export const Basic: Story<{
  title: string;
  description: string;
  action: string;
}> = function ({ title, description, action }) {
  return (
    <CriticalBanner
      title={title}
      description={description}
      action={
        <CriticalBannerPrimaryButton>{action}</CriticalBannerPrimaryButton>
      }
    />
  );
};

Basic.args = {
  title: "Title.",
  description: "Description text if necessary. Avoid if possible.",
  action: "Click me",
};
