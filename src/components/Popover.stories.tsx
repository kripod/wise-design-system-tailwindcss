import type { Story } from "@ladle/react";
import * as React from "react";

import { PrimaryButton } from "./buttons/PrimaryButton";
import { Popover } from "./Popover";

export const Basic: Story<{
  title: string;
  text: string;
  onClose: () => void;
}> = function ({ title, text, onClose }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover
      open={open}
      renderTrigger={({ ref, getInteractionProps }) => (
        <PrimaryButton
          ref={ref}
          {...getInteractionProps({
            onClick: () => {
              setOpen((prev) => !prev);
            },
          })}
        >
          Toggle popover
        </PrimaryButton>
      )}
      title={title}
      onClose={() => {
        onClose();
        setOpen(false);
      }}
    >
      {text}
    </Popover>
  );
};

Basic.args = {
  title: "Guaranteed rate",
  text: "You’ll get this rate as long as we receive your 10 EUR within the next 51 hours.",
};

Basic.argTypes = {
  onClose: {
    action: "closed",
  },
};
