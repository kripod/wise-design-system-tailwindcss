export function parseBooleanish(value: boolean | "true" | "false") {
  return value && value !== "false";
}
