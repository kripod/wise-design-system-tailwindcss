import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  type Placement,
  shift,
  size as floatingSize,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Transition } from "@headlessui/react";
import { clsx } from "clsx/lite";
import * as React from "react";

import { PreventScroll } from "./PreventScroll";

export interface PopoverProps {
  placement?: Placement;
  open: boolean;
  renderTrigger: (args: {
    ref: React.RefCallback<Element>;
    getInteractionProps: (customEventHandlers?: React.HTMLProps<Element>) => {
      [key: string]: unknown;
    };
  }) => React.ReactNode;
  title?: string;
  size?: "md" | "lg";
  padding?: "none" | "md";
  children?: React.ReactNode;
  onClose?: () => void;
}

const floatingPadding = 16;

export function Popover({
  placement,
  open,
  renderTrigger,
  title,
  size = "md",
  padding = "md",
  children,
  onClose,
}: PopoverProps) {
  const { refs, floatingStyles, context } = useFloating<Element>({
    placement,
    middleware: [
      offset(8),
      flip({ padding: floatingPadding, crossAxis: false }),
      shift(),
      floatingSize({
        padding: floatingPadding,
        apply: ({ elements, rects, availableHeight }) => {
          elements.floating.style.setProperty(
            "--max-height",
            `${availableHeight}px`,
          );
          elements.floating.style.setProperty(
            "--width",
            `${rects.reference.width}px`,
          );
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
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
    role,
    dismiss,
  ]);

  const [floatingKey, setFloatingKey] = React.useState(0);

  return (
    <>
      {open ? <PreventScroll /> : null}
      {renderTrigger({
        ref: refs.setReference,
        getInteractionProps: getReferenceProps,
      })}

      <FloatingPortal>
        <Transition
          show={open}
          leave="transition-opacity"
          leaveTo="opacity-0"
          beforeEnter={() => {
            setFloatingKey((prev) => prev + 1);
          }}
        >
          <FloatingFocusManager context={context}>
            <div
              key={floatingKey} // Force inner state invalidation on open
              ref={refs.setFloating}
              className={clsx(
                "theme-overlay z-10 flex max-h-[--max-height] w-[--width] flex-col overflow-hidden rounded bg-background-elevated shadow-xl focus:outline-none",
                size === "md" && "min-w-[20rem]",
                size === "lg" && "min-w-[24rem]",
              )}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div
                className={clsx(
                  "grid gap-y-2 overflow-y-auto",
                  title ? "grid-rows-[auto_1fr]" : "grid-rows-1",
                  padding === "md" && "p-4",
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
        </Transition>
      </FloatingPortal>
    </>
  );
}
