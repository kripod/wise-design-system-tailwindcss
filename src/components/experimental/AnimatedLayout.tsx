import * as React from "react";

import { useConstant } from "../../hooks/useConstant";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { useResizeObserver } from "../../hooks/useResizeObserver";

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
  // TODO: Warn about IDs being used twice
  const element = React.useRef<HTMLElement>(null);

  const { boundingClientRectById } = React.useContext(
    AnimatedLayoutGroupContext,
  );
  // TODO: Call `boundingClientRectById.delete(id)` based on ref counting

  const animation = React.useRef<Animation | null>(null);

  const windowResizing = React.useRef(false);
  React.useEffect(() => {
    let timeoutHandle: number | undefined;
    const handleResize = () => {
      animation.current?.finish();
      windowResizing.current = true;
      window.clearTimeout(timeoutHandle);
      timeoutHandle = window.setTimeout(() => {
        windowResizing.current = false;
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timeoutHandle);
    };
  }, []);

  const reduceMotion = useReducedMotionPreference();

  useResizeObserver(element, (entry) => {
    const last = entry.target.getBoundingClientRect();
    const first = boundingClientRectById.get(id);
    boundingClientRectById.set(id, last);

    if (
      animation.current == null &&
      !windowResizing.current &&
      !reduceMotion &&
      first != null
    ) {
      const dX = first.left - last.left;
      const dY = first.top - last.top;
      const dW = first.width / last.width;
      const dH = first.height / last.height;

      if (dX !== 0 || dY !== 0 || dW !== 1 || dH !== 1) {
        animation.current = entry.target.animate(
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
  });

  return <>{children({ ref: element })}</>;
}
