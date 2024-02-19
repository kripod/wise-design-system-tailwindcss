import type { Story } from "@ladle/react";
import * as React from "react";

import { Dialog, DialogProps } from "./Dialog";
import { PrimaryButton } from "./PrimaryButton";

export const Basic: Story<
  Pick<DialogProps, "title" | "size" | "onClose" | "children">
> = ({ title, size, onClose, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)}>Open dialog</PrimaryButton>
      <Dialog title={title} open={open} size={size} onClose={onClose}>
        {children}
      </Dialog>
    </>
  );
};

Basic.args = {
  title: "Change this user’s role?",
  children: "Content goes here",
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
