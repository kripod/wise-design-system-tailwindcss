import type { Story } from "@ladle/react";
import * as React from "react";

import { BottomSheet } from "./BottomSheet";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Basic: Story<{
  title: string;
  text: string;
  onClose: () => void;
}> = function ({ title, text, onClose }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)}>
        Open bottom sheet
      </PrimaryButton>
      <BottomSheet
        open={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
      >
        <div className="flex flex-col gap-y-3">
          <h2 className="text-2xl text-content-primary">{title}</h2>
          {text}
        </div>
      </BottomSheet>
    </>
  );
};

Basic.args = {
  title: "Title goes here",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ".repeat(
    10,
  ),
};

Basic.argTypes = {
  onClose: {
    action: "closed",
  },
};
