import { Dialog as DialogBase } from "@headlessui/react";
import { clsx } from "clsx";

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

      <div className="fixed inset-0 flex overflow-auto">
        <div
          className={clsx("m-auto w-full p-4", {
            "max-w-xl": size === "sm",
            "max-w-3xl": size === "md",
            "max-w-5xl": size === "lg",
          })}
        >
          <DialogBase.Panel className="divide-y rounded-xl bg-background-screen shadow-xl">
            <div className="flex items-start justify-between gap-6 p-6">
              <DialogBase.Title className="text-lg font-semibold">
                {title}
              </DialogBase.Title>
              <CloseButton size="lg" onClick={onClose} />
            </div>

            <div className="p-6">{children}</div>

            {footer != null ? <div className="p-6">{footer}</div> : null}
          </DialogBase.Panel>
        </div>
      </div>
    </DialogBase>
  );
}
