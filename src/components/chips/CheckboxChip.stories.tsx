import type { Story } from "@ladle/react";

import { CheckboxChip, CheckboxChipGroup } from "./CheckboxChip";

export const Basic: Story<{
  disabled: boolean;
  onChange: () => void;
}> = function ({ disabled, onChange }) {
  return (
    <CheckboxChipGroup disabled={disabled}>
      <CheckboxChip name="accounting" defaultChecked onChange={onChange}>
        Accounting
      </CheckboxChip>
      <CheckboxChip name="payroll" onChange={onChange}>
        Payroll
      </CheckboxChip>
      <CheckboxChip name="reporting" onChange={onChange}>
        Reporting
      </CheckboxChip>
      <CheckboxChip name="payments" onChange={onChange} disabled>
        Payments
      </CheckboxChip>
    </CheckboxChipGroup>
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
