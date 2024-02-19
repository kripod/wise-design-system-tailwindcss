function roundTo(value: number, fractionDigits: number) {
  return Number(
    `${Math.round(Number(`${value}e+${fractionDigits}`))}e-${fractionDigits}`,
  );
}

export function pxToRem(value: number) {
  return `${roundTo(value / 16, 4)}rem`;
}
