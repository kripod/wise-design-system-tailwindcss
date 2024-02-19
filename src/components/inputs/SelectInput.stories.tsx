import type { Story } from "@ladle/react";
import * as React from "react";

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
  clearable: boolean;
  invalid: boolean;
  disabled: boolean;
  onChange: (value: Month | null) => void;
  onClear: () => void;
}> = function ({ clearable, invalid, disabled, onChange, onClear }) {
  const [selectedMonth, setSelectedMonth] = React.useState<Month | null>(null);

  return (
    <div className="flex flex-col">
      <Field
        label="Label"
        hint="Information message."
        error={invalid ? "Error message." : undefined}
      >
        <SelectInput
          placeholder="Month"
          value={selectedMonth}
          renderValue={(value) => value.name}
          disabled={disabled}
          onChange={(value) => {
            setSelectedMonth(value);
            onChange(value);
          }}
          onClear={
            clearable
              ? () => {
                  setSelectedMonth(null);
                  onClear();
                }
              : undefined
          }
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
  clearable: true,
  invalid: false,
  disabled: false,
};

Basic.argTypes = {
  onChange: {
    action: "changed",
  },
  onClear: {
    action: "cleared",
  },
};
