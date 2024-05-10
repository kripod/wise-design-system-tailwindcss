import { HelpCircle } from "@transferwise/icons";
import { useState } from "react";

import { HintPopoverLabel } from "../config/i18nTexts";
import { Popover } from "./Popover";

export interface HintPopoverProps {
  label: React.ReactNode;
  children?: React.ReactNode;
}

export function HintPopover({ label, children }: HintPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="inline-flex items-center gap-x-1">
      <span>{label}</span>
      <Popover
        placement="bottom-start"
        open={open}
        renderTrigger={({ ref, getInteractionProps }) => (
          <button
            ref={ref}
            type="button"
            {...getInteractionProps({
              onClick: () => {
                setOpen((prev) => !prev);
              },
            })}
          >
            <HelpCircle title={HintPopoverLabel} size={16} />
          </button>
        )}
        onClose={() => {
          setOpen(false);
        }}
      >
        {children}
      </Popover>
    </span>
  );
}
