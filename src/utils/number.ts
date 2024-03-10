export function safeParseFloat(value: string) {
  if (value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed || 0; // Treat `-0` as `0`
    }
  }
  return null;
}
