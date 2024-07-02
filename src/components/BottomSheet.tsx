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

            <div className="fixed inset-0 flex flex-col justify-end px-2 pt-16">
              <TransitionChild>
                <div className="max-h-full transition-transform duration-300 motion-safe:data-[closed]:translate-y-full motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:data-[closed]:opacity-0">
                  <FloatingFocusManager
                    context={context}
                    initialFocus={initialFocusRef}
                  >
                    <div
                      key={floatingKey} // Force inner state invalidation on open
                      ref={refs.setFloating}
                      className="flex h-full flex-col rounded-t-xl bg-background-elevated shadow-xl focus:outline-none"
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
                  </FloatingFocusManager>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Transition>
      </FloatingPortal>
    </>
  );
}
