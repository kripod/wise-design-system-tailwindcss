export function parseBooleanish(value: boolean | "true" | "false") {
  return Boolean(value) && value !== "false";
}
