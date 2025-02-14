import {isObject} from "./assertion";

type Key = string | number;

export interface MergeObject {
  [key: string]: any;
}

export const renameProp = (oldProp: string, newProp: string, {[oldProp]: old, ...others}) => ({
  [newProp]: old,
  ...others,
});

// copy an object without reference
export const copyObject = (obj: any) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Array) return [...obj];

  return {...obj};
};

// copy an object omit some keys
export const omitObject = (obj: any, omitKeys: string[]) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Array) return [...obj];
  const newObj = {...obj};

  omitKeys.forEach((key) => newObj[key] && delete newObj[key]);

  return newObj;
};

// clean undefined and null values
export const cleanObject = (obj: any) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Array) return [...obj];
  const newObj = {...obj};

  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === undefined || newObj[key] === null) {
      delete newObj[key];
    }
  });

  return newObj;
};

export const cleanObjectKeys = (obj: any, keys: string[] = []) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Array) return [...obj];
  const newObj = {...obj};

  keys.forEach((key) => {
    if (newObj[key]) {
      delete newObj[key];
    }
  });

  return newObj;
};

export const getKeyValue = (obj: any, key: Key) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Array) return [...obj];

  return obj[key];
};

/**
 * Get value from a deeply nested object using a string path.
 * Memorizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param fallback  - the fallback value
 */
export const getProp = (
  obj: Record<string, any>,
  path: string | number,
  fallback?: any,
  index?: number,
) => {
  const key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) break;
    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
};

/**
 * Converting an array of objects into a single object.
 * @param arr - the array of objects
 * @returns the single object
 */
export const arrayToObject = (arr: any[]) => {
  if (!arr.length || !Array.isArray(arr)) return {};

  return arr.reduce((acc, item) => {
    return {...acc, ...item};
  }, {});
};

export function compact<T extends Record<any, any>>(object: T) {
  const clone = Object.assign({}, object);

  for (let key in clone) {
    if (clone[key] === undefined) delete clone[key];
  }

  return clone;
}
