import {
  Dialog as DialogBase,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { clsx } from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";

import { CloseButton } from "./buttons/CloseButton";

export interface ModalProps {
  open: boolean;
  title: string;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  onClose: () => void;
}

export function Modal({
  open,
  title,
  footer,
  size = "md",
  children,
  onClose,
}: ModalProps) {
  return (
    <DialogBase
      open={open}
      className="relative z-50"
      onClose={() => {
        onClose();
      }}
    >
      <div
        className="fixed inset-0 bg-content-primary opacity-40"
        aria-hidden
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className={clsx(
              "w-full divide-y rounded-lg bg-background-screen shadow-xl",
              /* TODO: Assess sizing */
              size === "sm" && "max-w-xl",
              size === "md" && "max-w-3xl",
              size === "lg" && "max-w-5xl",
            )}
          >
            <div className="flex items-center gap-x-6 p-6">
              <DialogTitle
                className={clsx(
                  getResetClassName("h2"),
                  "flex-1 text-title-body",
                )}
              >
                {title}
              </DialogTitle>
              <CloseButton size="lg" onClick={onClose} />
            </div>

            <div className="p-6">{children}</div>

            {footer ? <div className="p-6">{footer}</div> : null}
          </DialogPanel>
        </div>
      </div>
    </DialogBase>
  );
}
