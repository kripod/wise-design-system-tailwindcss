const monthsInYear = 12;

export function getMonthNames(
  locales: string | string[],
  format: "long" | "short" | "narrow" = "long",
) {
  const dateTimeFormat = new Intl.DateTimeFormat(locales, {
    timeZone: "UTC",
    month: format,
  });
  return Array.from({ length: monthsInYear }).map((_, index) =>
    dateTimeFormat.format(new Date(0).setUTCMonth(index)),
  );
}
