const BINARY64_BASE = 2;
const BINARY64_PRECISION = 53;
const MAX_SAFE_PRECISION = Math.trunc(
  (BINARY64_PRECISION - 1) * Math.log10(BINARY64_BASE),
);

export function roundToSafePrecision(value: number) {
  return Number(value.toPrecision(MAX_SAFE_PRECISION));
}
