import type { Story } from "@ladle/react";

import { getMonthNames } from "../../date";
import { SelectInput, SelectInputOption } from "./SelectInput";

interface Month {
  id: number;
  name: string;
  unavailable: boolean;
}

const months: Month[] = getMonthNames("en-US").map((name, index) => ({
  id: index + 1,
  name,
  unavailable: index % 6 === 2,
}));

export const Basic: Story<{
  invalid: boolean;
  disabled: boolean;
  onChange: (value: Month) => void;
}> = function ({ invalid, disabled, onChange }) {
  return (
    <div className="flex flex-col">
      <SelectInput<Month>
        name="test"
        renderValue={(value) => value.name}
        aria-invalid={invalid}
        disabled={disabled}
        onChange={onChange}
      >
        {months.map((month) => (
          <SelectInputOption
            key={month.id}
            value={month}
            disabled={month.unavailable}
          >
            {month.name}
          </SelectInputOption>
        ))}
      </SelectInput>
    </div>
  );
};

Basic.args = {
  invalid: false,
  disabled: false,
};

Basic.argTypes = {
  onChange: {
    action: "changed",
  },
};
