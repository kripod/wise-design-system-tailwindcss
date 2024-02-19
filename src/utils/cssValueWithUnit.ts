export function cssValueWithUnit(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}
