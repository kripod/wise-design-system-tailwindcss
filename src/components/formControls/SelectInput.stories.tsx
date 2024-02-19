import type { Story } from "@ladle/react";

import { getMonthNames } from "../../date";
import { Field } from "./Field";
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
  onChange: (value: Month | undefined) => void;
}> = function ({ invalid, disabled, onChange }) {
  return (
    <div className="flex flex-col">
      <Field
        label="Label"
        hint="Information message."
        error={invalid ? "Error message." : undefined}
      >
        <SelectInput
          placeholder="Month"
          renderValue={(value) => value.name}
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
      </Field>
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
