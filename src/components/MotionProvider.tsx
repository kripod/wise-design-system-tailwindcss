import { domMax, LazyMotion, MotionConfig, Transition } from "framer-motion";

export type MotionProviderProps = {
  children: React.ReactNode;
};

const defaultTransition: Transition = {
  /* Adhere to the Tailwind config */
  duration: 0.3,
  ease: [0, 0, 0.2, 1],
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user" transition={defaultTransition}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
