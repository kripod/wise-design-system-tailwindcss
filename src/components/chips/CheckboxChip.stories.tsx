import type { Story } from "@ladle/react";

import { CheckboxChip, CheckboxChipGroup } from "./CheckboxChip";

export const Basic: Story<{
  onChange: () => void;
}> = function ({ onChange }) {
  return (
    <CheckboxChipGroup>
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

Basic.argTypes = {
  // TODO: Enable when actions are handled without re-rendering
  /*
  onChange: {
    action: "changed",
  },
  */
};
