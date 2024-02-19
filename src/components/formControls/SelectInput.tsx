import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import { Listbox as ListboxBase } from "@headlessui/react";
import { ChevronDown } from "@transferwise/icons";
import { clsx } from "clsx";
import { getResetClassName } from "css-homogenizer/reset-scoped";
import * as React from "react";

import { formControlClassNameBase } from "./_FormControl";

const monthsInYear = 12;

function getMonthNames(
  locales: string | string[],
  format: Intl.DateTimeFormatOptions["month"] = "long",
) {
  const dateTimeFormat = Intl.DateTimeFormat(locales, {
    timeZone: "UTC",
    month: format,
  });
  return Array.from({ length: monthsInYear }).map((_, index) =>
    dateTimeFormat.format(new Date(0).setUTCMonth(index)),
  );
}

const months = getMonthNames("en-US").map((name, index) => ({
  id: index + 1,
  name,
  unavailable: index % 6 === 2,
}));

export function SelectInput() {
  const [selectedMonth, setSelectedMonth] = React.useState(months[0]);

  const [maxHeight, setMaxHeight] = React.useState<number>();
  const [width, setWidth] = React.useState<number>();
  const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
    placement: "bottom-start",
    middleware: [
      offset(8),
      flip({ padding: 16 }),
      size({
        padding: 16,
        apply: ({ rects, availableHeight }) => {
          setMaxHeight(availableHeight);
          setWidth(rects.reference.width);
        },
      }),
      // shift({ limiter: limitShift(), padding: 16 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <ListboxBase value={selectedMonth} onChange={setSelectedMonth}>
      <ListboxBase.Button
        ref={refs.setReference}
        className={clsx(
          getResetClassName("button"),
          formControlClassNameBase({ size: "md" }),
          "inline-flex items-center gap-x-2 rounded text-start",
        )}
      >
        <span className="flex-1 truncate">{selectedMonth.name}</span>
        <ChevronDown size={16} />
      </ListboxBase.Button>

      <FloatingPortal>
        <ListboxBase.Options
          ref={refs.setFloating}
          className={clsx(
            getResetClassName("ul"),
            "z-10 overflow-auto rounded bg-background-elevated p-2 shadow-xl focus:outline-none",
          )}
          style={{
            ...floatingStyles,
            maxHeight,
            width,
          }}
        >
          {months.map((month) => (
            <ListboxBase.Option
              key={month.id}
              value={month}
              disabled={month.unavailable}
              className={({ active, selected, disabled }) =>
                clsx(
                  "rounded px-4 py-3 text-base text-content-primary",
                  disabled && "opacity-45",
                  selected
                    ? "bg-background-screen-active"
                    : active && "bg-background-screen-hover",
                  active && "-outline-offset outline",
                )
              }
            >
              {month.name}
            </ListboxBase.Option>
          ))}
        </ListboxBase.Options>
      </FloatingPortal>
    </ListboxBase>
  );
}
