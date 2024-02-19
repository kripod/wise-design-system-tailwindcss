import { Dialog as DialogBase } from "@headlessui/react";
import clsx from "clsx";

import { CloseButton } from "./CloseButton";

export type DialogProps = {
  title: string;
  open: boolean;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClose: () => void;
};

export function Dialog({
  title,
  open,
  footer,
  size = "md",
  children,
  onClose,
}: DialogProps) {
  return (
    <DialogBase
      open={open}
      className="relative z-50"
      onClose={() => {
        onClose();
      }}
    >
      <div className="fixed inset-0 bg-background-overlay" aria-hidden />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogBase.Panel
          className={clsx(
            "w-full divide-y rounded-xl bg-background-screen shadow-xl",
            {
              "max-w-xl": size === "sm",
              "max-w-3xl": size === "md",
              "max-w-5xl": size === "lg",
            },
          )}
        >
          <DialogBase.Title className="flex items-start justify-between p-6 text-lg font-semibold">
            <span>{title}</span>
            <CloseButton size="lg" />
          </DialogBase.Title>

          <DialogBase.Description className="p-6">
            {children}
          </DialogBase.Description>

          {footer != null ? <div className="p-6">{footer}</div> : null}
        </DialogBase.Panel>
      </div>
    </DialogBase>
  );
}
