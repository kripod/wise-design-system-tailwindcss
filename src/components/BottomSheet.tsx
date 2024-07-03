import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Transition, TransitionChild } from "@headlessui/react";
import { clsx } from "clsx/lite";
import { useState } from "react";

import { useVirtualKeyboard } from "../hooks/useVirtualKeyboard";
import { CloseButton } from "./buttons/CloseButton";
import { PreventScroll } from "./PreventScroll";

export interface BottomSheetProps {
  open: boolean;
  renderTrigger?: (args: {
    ref: React.RefCallback<Element>;
    getInteractionProps: (customEventHandlers?: React.HTMLProps<Element>) => {
      [key: string]: unknown;
    };
  }) => React.ReactNode;
  title?: string;
  initialFocusRef?: React.RefObject<HTMLElement>;
  padding?: "none" | "md";
  children?: React.ReactNode;
  onClose: () => void;
}

export function BottomSheet({
  open,
  renderTrigger,
  title,
  initialFocusRef,
  padding = "md",
  children,
  onClose,
}: BottomSheetProps) {
  useVirtualKeyboard();

  const { refs, context } = useFloating<Element>({
    open,
    onOpenChange: (value) => {
      if (!value) {
        onClose();
      }
    },
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const [floatingKey, setFloatingKey] = useState(0);

  return (
    <>
      {open ? <PreventScroll /> : null}
      {renderTrigger?.({
        ref: refs.setReference,
        getInteractionProps: getReferenceProps,
      })}

      <FloatingPortal>
        <Transition
          show={open}
          beforeEnter={() => {
            setFloatingKey((prev) => prev + 1);
          }}
        >
          <div className="theme-overlay relative z-50">
            <TransitionChild>
              <div className="fixed inset-0 bg-content-primary opacity-40 transition-opacity duration-300 data-[closed]:opacity-0" />
            </TransitionChild>

            <div className="fixed inset-0 bottom-[env(keyboard-inset-height,0px)] mx-2 mt-16 flex flex-col justify-end">
              <FloatingFocusManager
                context={context}
                initialFocus={initialFocusRef}
              >
                <TransitionChild
                  key={floatingKey} // Force inner state invalidation on open
                >
                  <div
                    ref={refs.setFloating}
                    className="flex max-h-full flex-col rounded-t-xl bg-background-elevated shadow-xl focus:outline-none motion-safe:transition-transform motion-safe:duration-300 motion-safe:data-[closed]:translate-y-full motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:data-[closed]:opacity-0"
                    {...getFloatingProps()}
                  >
                    <div className="self-end p-4">
                      <CloseButton
                        onClick={() => {
                          onClose();
                        }}
                      />
                    </div>
                    <div
                      className={clsx(
                        "flex flex-col gap-y-2 overflow-auto",
                        padding === "md" && "p-4 pt-0",
                      )}
                    >
                      {title ? (
                        <h2 className="text-title-body text-content-primary">
                          {title}
                        </h2>
                      ) : null}
                      <div className="text-body text-content-secondary">
                        {children}
                      </div>
                    </div>
                  </div>
                </TransitionChild>
              </FloatingFocusManager>
            </div>
          </div>
        </Transition>
      </FloatingPortal>
    </>
  );
}
