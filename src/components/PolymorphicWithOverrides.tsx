import * as React from "react";

export interface PolymorphicWithOverridesProps {
  __overrides: {
    as: React.ElementType;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * For overcoming the limitations of third-party components with an `as` prop.
 */
export const PolymorphicWithOverrides = React.forwardRef(
  function PolymorphicWithOverrides(
    {
      __overrides: { as: Element, ...restOverrides },
      ...restProps
    }: PolymorphicWithOverridesProps,
    ref: React.ForwardedRef<Element>,
  ) {
    return <Element ref={ref} {...restProps} {...restOverrides} />;
  },
);
