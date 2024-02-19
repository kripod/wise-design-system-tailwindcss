import { useHydrateAtoms } from "jotai/utils";

type InitialValues = Parameters<typeof useHydrateAtoms>[0];

export type HydrateAtomsProps<T extends InitialValues> = {
  initialValues: T;
  children?: React.ReactNode;
};

export function HydrateAtoms<const T extends InitialValues>({
  initialValues,
  children,
}: HydrateAtomsProps<T>) {
  useHydrateAtoms(initialValues);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
