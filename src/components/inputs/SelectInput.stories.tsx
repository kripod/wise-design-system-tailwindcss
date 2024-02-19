import type { Story } from "@ladle/react";
import { Calendar, ChevronDown } from "@transferwise/icons";
import { clsx } from "clsx";
import * as React from "react";

import { getMonthNames } from "../../date";
import { Flag } from "../Flag";
import {
  SelectInput,
  type SelectInputItem,
  SelectInputOptionContent,
  SelectInputTriggerButton,
} from "./SelectInput";

interface TestMonth {
  id: number;
  name: string;
  unavailable: boolean;
}

const testMonths: TestMonth[] = getMonthNames("en-US").map((name, index) => ({
  id: index + 1,
  name,
  unavailable: index % 6 === 2,
}));

const testQuarters = [
  testMonths.slice(0, 3),
  testMonths.slice(3, 6),
  testMonths.slice(6, 9),
  testMonths.slice(9, 12),
] as const;

export const Basic: Story<{
  filterable: boolean;
  filterPlaceholder: string;
  clearable: boolean;
  invalid: boolean;
  disabled: boolean;
  onChange: (value: TestMonth | null) => void;
  onClear: () => void;
}> = function ({
  filterable,
  filterPlaceholder,
  clearable,
  disabled,
  onChange,
  onClear,
}) {
  const [selectedMonth, setSelectedMonth] = React.useState<TestMonth | null>(
    null,
  );

  return (
    <div className="flex flex-col">
      {/* TODO:
      <Field
        label="Label"
        hint="Information message."
        error={invalid ? "Error message." : undefined}
      >
      */}
      <SelectInput
        placeholder="Month"
        items={testQuarters
          .flatMap<SelectInputItem<TestMonth>>((quarterMonths, index) => [
            {
              type: "group",
              label: `Quarter #${index + 1}`,
              options: quarterMonths.map((month) => ({
                type: "option",
                value: month,
                filterMatchers: [month.name],
                disabled: month.unavailable,
              })),
            },
            { type: "separator" },
          ])
          .slice(0, -1)}
        value={selectedMonth}
        renderValue={(month, compact) => (
          <SelectInputOptionContent
            title={month.name}
            note="Note"
            description={compact ? undefined : `Month #${month.id}`}
            icon={<Calendar size={24} />}
          />
        )}
        filterable={filterable}
        filterPlaceholder={filterPlaceholder}
        disabled={disabled}
        onChange={(month) => {
          setSelectedMonth(month);
          onChange(month);
        }}
        onClear={
          clearable
            ? () => {
                setSelectedMonth(null);
                onClear();
              }
            : undefined
        }
      />
    </div>
  );
};

Basic.args = {
  filterable: true,
  filterPlaceholder: "Type a month’s name",
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

interface Month {
  id: number;
  name: string;
}

const months: Month[] = getMonthNames("en-US").map((name, index) => ({
  id: index + 1,
  name,
}));

export const Months: Story<{
  onChange: (value: Month | null) => void;
  onClear: () => void;
}> = function ({ onChange, onClear }) {
  const [selectedMonth, setSelectedMonth] = React.useState<Month | null>(null);

  return (
    <div className="flex flex-col">
      <SelectInput
        placeholder="Month"
        items={months.map((month) => ({
          type: "option",
          value: month,
        }))}
        value={selectedMonth}
        renderValue={(month) => <SelectInputOptionContent title={month.name} />}
        onChange={(month) => {
          setSelectedMonth(month);
          onChange(month);
        }}
        onClear={() => {
          setSelectedMonth(null);
          onClear();
        }}
      />
    </div>
  );
};

Months.argTypes = {
  onChange: {
    action: "changed",
  },
  onClear: {
    action: "cleared",
  },
};

interface Currency {
  code: string;
  name: string;
  countries?: string[];
}

const popularCurrencies: Currency[] = [
  {
    code: "USD",
    name: "United States dollar",
    countries: ["Hong Kong", "Saudi Arabia"],
  },
  {
    code: "EUR",
    name: "Euro",
    countries: ["Spain", "Germany", "France", "Austria", "Estonia"],
  },
  {
    code: "GBP",
    name: "British pound",
    countries: ["England", "Scotland", "Wales"],
  },
];

const otherCurrencies: Currency[] = [
  {
    code: "CAD",
    name: "Canadian dollar",
    countries: ["Canada"],
  },
  {
    code: "AUD",
    name: "Australian dollar",
  },
];

const allCurrencies: Currency[] = [
  ...popularCurrencies,
  ...otherCurrencies,
].sort((a, b) => a.code.localeCompare(b.code));

function currencyOption(currency: Currency) {
  return {
    type: "option",
    value: currency,
    filterMatchers: [
      currency.code,
      currency.name,
      ...(currency.countries ?? []),
    ],
  } satisfies SelectInputItem<Currency>;
}

export const Currencies: Story<{
  onChange: (value: Currency) => void;
}> = function ({ onChange }) {
  const [selectedCurrency, setSelectedCurrency] = React.useState<Currency>(
    popularCurrencies[0],
  );

  return (
    <div className="flex flex-col">
      <SelectInput
        items={[
          {
            type: "group",
            label: "Popular currencies",
            options: popularCurrencies.map((currency) =>
              currencyOption(currency),
            ),
          },
          {
            type: "group",
            label: "All currencies",
            options: allCurrencies.map((currency) => currencyOption(currency)),
          },
        ]}
        value={selectedCurrency}
        renderValue={(currency) => (
          <SelectInputOptionContent
            title={currency.code}
            note={currency.name}
            icon={<Flag code={currency.code} intrinsicSize={24} />}
          />
        )}
        filterable
        filterPlaceholder="Type a currency / country"
        onChange={(currency) => {
          setSelectedCurrency(currency);
          onChange(currency);
        }}
      />
    </div>
  );
};

Currencies.argTypes = {
  onChange: {
    action: "changed",
  },
};

export const CustomTrigger: Story = function () {
  return (
    <SelectInput
      placeholder="Month"
      items={months.map((month) => ({
        type: "option",
        value: month,
      }))}
      renderValue={(month, compact) =>
        compact ? month.name : <SelectInputOptionContent title={month.name} />
      }
      renderTrigger={({ content, className }) => (
        <SelectInputTriggerButton
          className={clsx(
            className,
            "inline-flex items-center gap-x-1 font-semibold text-content-link underline hover:text-content-link-hover active:text-content-link-active",
          )}
        >
          {content}
          <ChevronDown size={16} />
        </SelectInputTriggerButton>
      )}
    />
  );
};
