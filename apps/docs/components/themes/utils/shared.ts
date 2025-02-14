import {Border} from "../types";

/**
 * Copy data to clipboard
 * @param data
 */
export function copyData(data: string) {
  navigator.clipboard.writeText(data);
}

/**
 * Stringify data
 *
 * @param data
 * @returns
 */
export function stringifyData(data: unknown) {
  return JSON.stringify(data, null, 2);
}

export function getBorderWidth(data: Border) {
  if (data === "thin") {
    return 1;
  }
  if (data === "medium") {
    return 2;
  }

  return 4;
}
