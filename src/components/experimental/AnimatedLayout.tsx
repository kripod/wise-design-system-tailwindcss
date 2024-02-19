import * as React from "react";

import { useConstant } from "../../hooks/useConstant";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { useRequestAnimationFrame } from "../../hooks/useRequestAnimationFrame";

const AnimatedLayoutGroupContext = React.createContext({
  boundingClientRectById: new Map<string, DOMRect>(),
});

export type AnimatedLayoutGroupProps = {
  children: React.ReactNode;
};

export function AnimatedLayoutGroup({ children }: AnimatedLayoutGroupProps) {
  const boundingClientRectById = useConstant(() => new Map<string, DOMRect>());
  return (
    <AnimatedLayoutGroupContext.Provider
      value={React.useMemo(
        () => ({ boundingClientRectById }),
        [boundingClientRectById],
      )}
    >
      {children}
    </AnimatedLayoutGroupContext.Provider>
  );
}

export type AnimatedLayoutProps = {
  id: string;
  children: ({ ref }: { ref: React.RefObject<HTMLElement> }) => React.ReactNode;
};

const defaultAnimationOptions: KeyframeAnimationOptions = {
  /* Adhere to the Tailwind config */
  duration: 300,
  easing: "cubic-bezier(0, 0, 0.2, 1)",
};

export function AnimatedLayout({ id, children }: AnimatedLayoutProps) {
  const element = React.useRef<HTMLElement>(null);
  const animation = React.useRef<Animation | null>(null);
  const reduceMotion = useReducedMotionPreference();

  const { boundingClientRectById } = React.useContext(
    AnimatedLayoutGroupContext,
  );

  useRequestAnimationFrame(() => {
    if (element.current != null) {
      const last = element.current.getBoundingClientRect();
      const first = boundingClientRectById.get(id);
      boundingClientRectById.set(id, last);

      if (animation.current == null && !reduceMotion && first != null) {
        const dX = first.left - last.left;
        const dY = first.top - last.top;
        const dW = first.width / last.width;
        const dH = first.height / last.height;

        if (dX !== 0 || dY !== 0 || dW !== 1 || dH !== 1) {
          animation.current = element.current.animate(
            [
              {
                transformOrigin: "top left",
                transform: `translate(${dX}px, ${dY}px) scale(${dW}, ${dH})`,
              },
              {
                transformOrigin: "top left",
                transform: "none",
              },
            ],
            defaultAnimationOptions,
          );
          animation.current.addEventListener("finish", () => {
            animation.current = null;
          });
        }
      }
    } else {
      // TODO: Replace this with ref counting to:
      // - Clean up unreplaced elements from `boundingClientRectById` (via rAF?)
      // - Warn about IDs being used twice
      boundingClientRectById.delete(id);
    }
  });

  return <>{children({ ref: element })}</>;
}
