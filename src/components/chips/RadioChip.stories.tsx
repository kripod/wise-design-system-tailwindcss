import type { Story } from "@ladle/react";

import { RadioChip, RadioChipGroup, RadioChipGroupProps } from "./RadioChip";

export const Basic: Story<Pick<RadioChipGroupProps, "onChange">> = function ({
  onChange,
}) {
  return (
    <RadioChipGroup onChange={onChange}>
      <RadioChip value="100">100 GBP</RadioChip>
      <RadioChip value="200">200 GBP</RadioChip>
      <RadioChip value="300">300 GBP</RadioChip>
      <RadioChip value="400+" disabled>
        400+ GBP
      </RadioChip>
    </RadioChipGroup>
  );
};

Basic.argTypes = {
  // TODO: Enable when actions are handled without re-rendering
  /*
  onChange: {
    action: "changed",
  },
  */
};
