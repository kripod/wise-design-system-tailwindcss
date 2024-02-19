import type { Story } from "@ladle/react";

import { RadioChip, RadioChipGroup } from "./RadioChip";

export const Basic: Story<{
  disabled: boolean;
  onChange: () => void;
}> = function ({ disabled, onChange }) {
  return (
    <RadioChipGroup disabled={disabled} onChange={onChange}>
      <RadioChip value="100">100 GBP</RadioChip>
      <RadioChip value="200">200 GBP</RadioChip>
      <RadioChip value="300">300 GBP</RadioChip>
      <RadioChip value="400+" disabled>
        400+ GBP
      </RadioChip>
    </RadioChipGroup>
  );
};

Basic.args = {
  disabled: false,
};

Basic.argTypes = {
  // TODO: Enable when actions are handled without re-rendering
  /*
  onChange: {
    action: "changed",
  },
  */
};
