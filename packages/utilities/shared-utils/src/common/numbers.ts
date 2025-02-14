/**
 * Returns an array of numbers, starting at `start` and ending at `end`.
 * @param start number
 * @param end number
 * @returns number[]
 */
export function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({length}, (_, index) => index + start);
}

/**
 * Clamps a value between a minimum and maximum range.
 *
 * @param value - The value to be clamped.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Clamps a value between 0 and a maximum value.
 * @param value - The value to clamp.
 * @param max - The maximum value to clamp to. Defaults to 100.
 * @returns The clamped value.
 */
export function clampPercentage(value: number, max: number = 100) {
  return Math.min(Math.max(value, 0), max);
}
