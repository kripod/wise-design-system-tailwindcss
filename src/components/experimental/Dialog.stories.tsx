import type { Story } from "@ladle/react";
import * as React from "react";

import { PrimaryButton } from "../buttons/PrimaryButton";
import { Dialog } from "./Dialog";

export const Basic: Story<{
  title: string;
  text: string;
  size: "sm" | "md" | "lg";
  onClose: () => void;
}> = function ({ title, text, size, onClose }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)}>Open dialog</PrimaryButton>
      <Dialog
        title={title}
        open={open}
        size={size}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
      >
        {text}
      </Dialog>
    </>
  );
};

Basic.args = {
  title: "Change this user’s role?",
  text: "Content goes here",
};

Basic.argTypes = {
  size: {
    options: ["sm", "md", "lg"],
    defaultValue: "md",
    control: { type: "radio" },
  },
  onClose: {
    action: "closed",
  },
};
