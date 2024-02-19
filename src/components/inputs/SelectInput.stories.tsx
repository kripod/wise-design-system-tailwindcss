import type { Meta, StoryObj } from "@storybook/react";
import {
  expect,
  fn,
  type Mock,
  screen,
  userEvent,
  within,
} from "@storybook/test";
import { Calendar, ChevronDown } from "@transferwise/icons";
import { clsx } from "clsx";
import * as React from "react";

import { getMonthNames } from "../../utils/date";
import { Flag } from "../Flag";
import { InlineLink } from "../InlineLink";
import {
  SelectInput,
  type SelectInputItem,
  SelectInputOptionContent,
  type SelectInputProps,
  SelectInputTriggerButton,
} from "./SelectInput";

const meta = {
  title: "components/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectInput>;
export default meta;

type Story<T> = StoryObj<SelectInputProps<T>>;

interface Month {
  id: number;
  name: string;
}

const months: Month[] = getMonthNames("en-US").map((name, index) => ({
  id: index + 1,
  name,
}));

export const Months: Story<Month | null> = {
  args: {
    placeholder: "Month",
    items: months.map((month) => ({
      type: "option",
      value: month,
    })),
    renderValue: (month) => <SelectInputOptionContent title={month.name} />,
    onChange: fn() satisfies Mock,
    onClear: fn() satisfies Mock,
  },
  render: function Render({ onChange, onClear, ...args }) {
    const [selectedMonth, setSelectedMonth] = React.useState<Month | null>(
      null,
    );

    return (
      <SelectInput
        {...args}
        value={selectedMonth}
        onChange={(month) => {
          setSelectedMonth(month);
          onChange?.(month);
        }}
        onClear={() => {
          setSelectedMonth(null);
          onClear?.();
        }}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("renders placeholder", async () => {
      const triggerButton = canvas.getByRole("button");
      await expect(triggerButton).toHaveTextContent("Month");
    });

    await step("selects item via mouse", async () => {
      const triggerButton = canvas.getByRole("button");

      await userEvent.click(triggerButton);
      await userEvent.unhover(triggerButton);

      const option = within(screen.getByRole("listbox")).getByRole("option", {
        name: "May",
      });
      await userEvent.click(option);

      await expect(triggerButton).toHaveTextContent("May");
    });
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

export const Currencies: Story<Currency> = {
  args: {
    items: [
      {
        type: "group",
        label: "Popular currencies",
        options: popularCurrencies.map((currency) => currencyOption(currency)),
      },
      {
        type: "group",
        label: "All currencies",
        options: allCurrencies.map((currency) => currencyOption(currency)),
      },
    ],
    defaultValue: popularCurrencies[0],
    renderValue: (currency, withinTrigger) => (
      <SelectInputOptionContent
        title={currency.code}
        note={withinTrigger ? undefined : currency.name}
        icon={<Flag code={currency.code} intrinsicSize={24} />}
      />
    ),
    renderFooter: ({ resultsEmpty, normalizedQuery }) =>
      resultsEmpty &&
      normalizedQuery != null &&
      /^[a-z]{3}$/u.test(normalizedQuery) ? (
        <>
          It’s not possible use {normalizedQuery.toUpperCase()} yet.{" "}
          <InlineLink href="#_" onClick={(event) => event.preventDefault()}>
            Email me when it’s available.
          </InlineLink>
        </>
      ) : (
        <>
          Can’t find it?{" "}
          <InlineLink href="#_" onClick={(event) => event.preventDefault()}>
            Request the currency you need,
          </InlineLink>{" "}
          and we’ll notify you once it’s available.
        </>
      ),
    filterable: true,
    filterPlaceholder: "Type a currency / country",
    size: "xl",
    onChange: fn() satisfies Mock,
  },
  play: async ({ step }) => {
    await step("filters items via keyboard", async () => {
      await userEvent.tab();
      await userEvent.keyboard(" ");

      await expect(
        within(screen.getByRole("listbox")).queryAllByRole("option"),
      ).toHaveLength(8);
      await expect(screen.getByText(/^Can’t find it?/u)).toBeInTheDocument();

      const input = screen.getByRole("searchbox");

      await userEvent.type(input, "huf");
      await expect(
        within(screen.getByRole("listbox")).queryAllByRole("option"),
      ).toHaveLength(0);
      await expect(
        screen.getByText(/^It’s not possible use HUF yet./u),
      ).toBeInTheDocument();

      await userEvent.type(input, "{Backspace}{Backspace}");
      await expect(
        within(screen.getByRole("listbox")).queryAllByRole("option"),
      ).toHaveLength(2);
    });
  },
};

export const CustomTrigger: Story<Month> = {
  args: {
    placeholder: "Month",
    items: months.map((month) => ({
      type: "option",
      value: month,
    })),
    renderValue: (month, withinTrigger) =>
      withinTrigger ? (
        month.name
      ) : (
        <SelectInputOptionContent title={month.name} />
      ),
    renderTrigger: ({ content, className }) => (
      <SelectInputTriggerButton
        className={clsx(
          className,
          "inline-flex items-center gap-x-1 text-link-lg text-content-link underline hover:text-content-link-hover active:text-content-link-active",
        )}
      >
        {content}
        <ChevronDown size={16} />
      </SelectInputTriggerButton>
    ),
    onChange: fn() satisfies Mock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByRole("button");
    await userEvent.click(triggerButton);
  },
};

const quarters = [
  months.slice(0, 3),
  months.slice(3, 6),
  months.slice(6, 9),
  months.slice(9, 12),
] as const;

export const Advanced: Story<Month> = {
  args: {
    placeholder: "Month",
    items: quarters
      .flatMap<SelectInputItem<Month>>((quarterMonths, quarterIndex) => [
        {
          type: "group",
          label: `Quarter #${quarterIndex + 1}`,
          options: quarterMonths.map((month, monthIndex) => ({
            type: "option",
            value: month,
            filterMatchers: [month.name],
            disabled: monthIndex % 6 === 2,
          })),
        },
        { type: "separator" },
      ])
      .slice(0, -1),
    renderValue: (month, withinTrigger) => (
      <SelectInputOptionContent
        title={month.name}
        note="Note"
        description={withinTrigger ? undefined : `Month #${month.id}`}
        icon={<Calendar size={24} />}
      />
    ),
    filterable: true,
    filterPlaceholder: "Type a month’s name",
    onChange: fn() satisfies Mock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByRole("button");
    await userEvent.click(triggerButton);
  },
};
