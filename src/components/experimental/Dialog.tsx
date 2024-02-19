import { Dialog as DialogBase } from "@headlessui/react";
import { clsx } from "clsx";

import { CloseButton } from "../buttons/CloseButton";

export type DialogProps = {
  title: string;
  open: boolean;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  onClose: () => void;
  children?: React.ReactNode;
};

export function Dialog({
  title,
  open,
  footer,
  size = "md",
  onClose,
  children,
}: DialogProps) {
  return (
    <DialogBase
      open={open}
      className="relative z-50"
      onClose={() => {
        onClose();
      }}
    >
      <div className="fixed inset-0 bg-content-primary/40" aria-hidden />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogBase.Panel
            className={clsx(
              "w-full divide-y rounded-lg bg-background-screen shadow-xl",
              {
                /* TODO: Assess sizing */
                "max-w-xl": size === "sm",
                "max-w-3xl": size === "md",
                "max-w-5xl": size === "lg",
              },
            )}
          >
            <div className="flex items-start justify-between gap-x-6 p-6">
              <DialogBase.Title className="flex-1 text-lg font-semibold">
                {title}
              </DialogBase.Title>
              <CloseButton onClick={onClose} />
            </div>

            <div className="p-6">{children}</div>

            {footer != null ? <div className="p-6">{footer}</div> : null}
          </DialogBase.Panel>
        </div>
      </div>
    </DialogBase>
  );
}
