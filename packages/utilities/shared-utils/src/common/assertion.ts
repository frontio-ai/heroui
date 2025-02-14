export const __DEV__ = process.env.NODE_ENV !== "production";

export const __TEST__ = process.env.NODE_ENV === "test";

export type Dict<T = any> = Record<string, T>;

export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value);
}

export function isEmptyArray(value: any) {
  return isArray(value) && value.length === 0;
}

export function isObject(value: any): value is Dict {
  const type = typeof value;

  return value != null && (type === "object" || type === "function") && !isArray(value);
}

export function isEmptyObject(value: any) {
  return isObject(value) && Object.keys(value).length === 0;
}

// Empty assertions
export function isEmpty(value: any): boolean {
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === "") return true;

  return false;
}

// Function assertions
export function isFunction<T extends Function = Function>(value: any): value is T {
  return typeof value === "function";
}

type Booleanish = boolean | "true" | "false";
export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "true" : undefined) as Booleanish;

export const isNumeric = (value?: string | number) =>
  value != null && parseInt(value.toString(), 10) > 0;
