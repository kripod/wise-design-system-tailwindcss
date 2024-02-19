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
import * as React from "react";

import { formControlClassNameBase } from "./_FormControl";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  {
    id: 2,
    name: "Kenton Towne fef efef efwefefweff weffwefwef",
    unavailable: false,
  },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export function Listbox() {
  const [selectedPerson, setSelectedPerson] = React.useState(people[0]);

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
    <ListboxBase value={selectedPerson} onChange={setSelectedPerson}>
      <ListboxBase.Button
        ref={refs.setReference}
        className={clsx(
          formControlClassNameBase({ size: "md" }),
          "inline-flex items-center justify-between gap-x-2 rounded text-start",
        )}
      >
        <span className="truncate">{selectedPerson.name}</span>
        <ChevronDown size={16} />
      </ListboxBase.Button>

      <FloatingPortal>
        <ListboxBase.Options
          ref={refs.setFloating}
          className="z-10 overflow-auto rounded bg-background-elevated p-2 shadow-xl focus:outline-none"
          style={{
            ...floatingStyles,
            maxHeight,
            width,
          }}
        >
          {people.map((person) => (
            <ListboxBase.Option
              key={person.id}
              value={person}
              disabled={person.unavailable}
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
              {person.name}
            </ListboxBase.Option>
          ))}
        </ListboxBase.Options>
      </FloatingPortal>
    </ListboxBase>
  );
}
