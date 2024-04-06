export type Assign<T, U> = DistributiveOmit<T, keyof U> & U;

export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;
