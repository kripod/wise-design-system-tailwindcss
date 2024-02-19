import type { Meta, StoryObj } from "@storybook/react";

import { CriticalBannerPrimaryButton } from "./buttons/PrimaryButton";
import { CriticalBanner } from "./CriticalBanner";

const meta = {
  component: CriticalBanner,
  tags: ["autodocs"],
  argTypes: {
    action: {
      options: ["button"],
      mapping: {
        button: (
          <CriticalBannerPrimaryButton>Action</CriticalBannerPrimaryButton>
        ),
      },
    },
  },
} satisfies Meta<typeof CriticalBanner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    title: "Title.",
    description: "Description text if necessary. Avoid if possible.",
    action: "button",
  },
} satisfies Story;
