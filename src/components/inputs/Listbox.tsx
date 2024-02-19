import {
  autoUpdate,
  flip,
  limitShift,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { Listbox as ListboxBase } from "@headlessui/react";
import { clsx } from "clsx";
import { useState } from "react";

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

function roundByDPR(value: number) {
  const dpr = window.devicePixelRatio;
  return Math.round(value * dpr) / dpr;
}

export function Listbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const { x, y, strategy, refs } = useFloating<HTMLButtonElement>({
    placement: "bottom-start",
    middleware: [
      offset(8),
      flip(),
      shift({ limiter: limitShift(), padding: 16 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <ListboxBase value={selectedPerson} onChange={setSelectedPerson}>
      <ListboxBase.Button
        ref={refs.setReference}
        className={clsx(
          "px-4 text-content-primary ring-1 ring-inset ring-interactive-secondary transition-shadow invalid:ring invalid:!ring-sentiment-negative enabled:hover:ring enabled:hover:ring-interactive-secondary-hover enabled:focus:outline-none enabled:focus:ring-3 enabled:focus:ring-interactive-primary disabled:opacity-45 disabled:mix-blend-luminosity",
          "py-3 text-base",
          "rounded",
        )}
      >
        {selectedPerson.name}
      </ListboxBase.Button>

      <ListboxBase.Options
        ref={refs.setFloating}
        className="top-0 left-0 w-max rounded-md bg-background-elevated shadow-xl"
        style={{
          position: strategy,
          transform: `translate(${roundByDPR(x ?? 0)}px, ${roundByDPR(
            y ?? 0,
          )}px)`,
        }}
      >
        {people.map((person) => (
          <ListboxBase.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </ListboxBase.Option>
        ))}
      </ListboxBase.Options>
    </ListboxBase>
  );
}
