import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Transition } from "@headlessui/react";
import { clsx } from "clsx";
import * as React from "react";

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
  onClose?: () => void;
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
        onClose?.();
      }
    },
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const [floatingKey, setFloatingKey] = React.useState(0);

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
          className="relative z-50"
          beforeEnter={() => {
            setFloatingKey((prev) => prev + 1);
          }}
        >
          <Transition.Child
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            leave="transition-opacity duration-300"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-content-primary opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 flex flex-col justify-end px-2 pt-16">
            <Transition.Child
              className="max-h-full"
              enter="motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-opacity motion-reduce:duration-300"
              enterFrom="motion-safe:translate-y-full motion-reduce:opacity-0"
              leave="motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-opacity motion-reduce:duration-300"
              leaveTo="motion-safe:translate-y-full motion-reduce:opacity-0"
            >
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
                        onClose?.();
                      }}
                    />
                  </div>
                  <div
                    className={clsx(
                      "pt-0",
                      "grid gap-y-2 overflow-y-auto",
                      title ? "grid-rows-[auto_1fr]" : "grid-rows-1",
                      {
                        "p-4": padding === "md",
                      },
                    )}
                  >
                    {title ? (
                      <h2 className="text-lg text-content-primary">{title}</h2>
                    ) : null}
                    <div className="text-sm text-content-secondary">
                      {children}
                    </div>
                  </div>
                </div>
              </FloatingFocusManager>
            </Transition.Child>
          </div>
        </Transition>
      </FloatingPortal>
    </>
  );
}
