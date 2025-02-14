type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

type AnyFunction<T = any> = (...args: T[]) => any;

type Extractable =
  | {
      [key: string]: any;
    }
  | undefined;

type Iteratee<T> = ((value: T) => any) | keyof T;

/**
 * Capitalizes the first character of a string and converts the rest of the string to lowercase.
 *
 * @param s - The string to capitalize.
 * @returns The capitalized string, or an empty string if the input is falsy.
 *
 * @example
 * capitalize('hello'); // returns 'Hello'
 * capitalize(''); // returns ''
 */
export const capitalize = (s: string) => {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
};

/**
 * Creates a function that invokes each provided function with the same argument, until
 * one of the functions calls `event.preventDefault()`.
 *
 * @param fns - An array of functions that may or may not be defined.
 * @returns A function that takes an event and invokes each handler with this event.
 *
 * @typeParam T - A function type that takes an event-like argument.
 *
 * @example
 * const handler1 = event => console.log('Handled by first', event.type);
 * const handler2 = event => event.preventDefault();
 * const allHandlers = callAllHandlers(handler1, handler2);
 * allHandlers({ type: 'click' });
 */
export function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
  return function func(event: Args<T>[0]) {
    fns.some((fn) => {
      fn?.(event);

      return event?.defaultPrevented;
    });
  };
}

/**
 * Creates a function that invokes each provided function with the same argument.
 *
 * @param fns - An array of functions that may or may not be defined.
 * @returns A function that takes one argument and invokes all provided functions with it.
 *
 * @typeParam T - A function type that takes any argument.
 *
 * @example
 * const greet = name => console.log(`Hello, ${name}!`);
 * const bye = name => console.log(`Goodbye, ${name}!`);
 * const greetAndBye = callAll(greet, bye);
 * greetAndBye('Alice');
 */
export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: Args<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg);
    });
  };
}

/**
 * Extracts a property from a list of objects, returning the first found non-falsy value or a default value.
 *
 * @param key - The key of the property to extract.
 * @param defaultValue - The default value to return if no non-falsy property value is found.
 * @param objs - An array of objects to search.
 * @returns The value of the extracted property or the default value.
 *
 * @typeParam K - The type of the key.
 * @typeParam D - The type of the default value.
 *
 * @example
 * extractProperty('name', 'Unknown', { name: 'Alice' }, { name: 'Bob' }); // returns 'Alice'
 * extractProperty('age', 18, { name: 'Alice' }); // returns 18
 */
export function extractProperty<K extends keyof Extractable, D extends keyof Extractable>(
  key: K | string,
  defaultValue: D | string | boolean,
  ...objs: Extractable[]
) {
  let result = defaultValue;

  for (const obj of objs) {
    if (obj && key in obj && !!obj[key]) {
      result = obj[key];
    }
  }

  return result as Extractable[K] | D | string | boolean;
}

/**
 * Generates a unique identifier using a specified prefix and a random number.
 *
 * @param prefix - The prefix to prepend to the unique identifier.
 * @returns A string that combines the prefix and a random number.
 *
 * @example
 * getUniqueID('btn'); // returns 'btn-123456'
 */
export function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

/**
 * Removes all properties from an object that start with 'on', which are typically event handlers.
 *
 * @param input - The object from which to remove event properties.
 * @returns The same object with event properties removed.
 *
 * @example
 * removeEvents({ onClick: () => {}, onChange: () => {}, value: 10 }); // returns { value: 10 }
 */
export function removeEvents(input: {[key: string]: any}) {
  for (const key in input) {
    if (key.startsWith("on")) {
      delete input[key];
    }
  }

  return input;
}

/**
 * Converts an object into a JSON string. Returns an empty string if the object
 * is not extractable or if a circular reference is detected during stringification.
 *
 * @param obj - The object to convert into a dependency string.
 *
 * @returns A JSON string representation of the object or an empty string if conversion fails.
 *
 * @example
 * objectToDeps({ key: 'value' }); // returns '{"key":"value"}'
 * objectToDeps(undefined); // returns ""
 */
export function objectToDeps(obj: Extractable) {
  if (!obj || typeof obj !== "object") {
    return "";
  }

  try {
    return JSON.stringify(obj);
  } catch (e) {
    return "";
  }
}

/**
 * Creates a debounced function that delays invoking `func` until after `waitMilliseconds` have elapsed
 * since the last time the debounced function was invoked. The debounced function has the
 * same `this` context and arguments as the original function.
 *
 * @param func - The function to debounce.
 * @param waitMilliseconds - The number of milliseconds to delay; defaults to 0.
 *
 * @returns A new debounced function.
 *
 * @typeParam F - The type of the function to debounce.
 *
 * @example
 * const save = debounce(() => console.log('Saved!'), 300);
 * save(); // Will log 'Saved!' after 300ms, subsequent calls within 300ms will reset the timer.
 */

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds: number = 0,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = () => {
      timeout = undefined;
      func.apply(this, args);
    };

    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, waitMilliseconds);
  };
}

/**
 * Returns a new array of unique elements from the given array, where the uniqueness is determined by the specified iteratee.
 *
 * @param arr - The array to process.
 * @param iteratee - The iteratee invoked per element to generate the criterion by which uniqueness is computed.
 *                  This can be a function or the string key of the object properties.
 *
 * @returns A new array of elements that are unique based on the iteratee function.
 *
 * @typeParam T - The type of elements in the input array.
 *
 * @example
 * uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id'); // returns [{ id: 1 }, { id: 2 }]
 */
export function uniqBy<T>(arr: T[], iteratee: any) {
  if (typeof iteratee === "string") {
    iteratee = (item: T) => item[iteratee as keyof T];
  }

  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
}

/**
 * Creates an object composed of the own and inherited enumerable property paths of `obj` that are not omitted.
 *
 * @param obj - The source object.
 * @param keys - The property keys to omit.
 *
 * @returns A new object with the keys specified omitted.
 *
 * @typeParam Obj - The type of the object.
 * @typeParam Keys - The type of the keys to omit.
 *
 * @example
 * omit({ a: 1, b: '2', c: 3 }, ['a', 'c']); // returns { b: '2' }
 */
export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const res = Object.assign({}, obj);

  keys.forEach((key) => {
    delete res[key];
  });

  return res;
};

/**
 * Converts a string to kebab-case.
 *
 * @param s - The string to convert.
 *
 * @returns The kebab-case version of the string.
 *
 * @example
 * kebabCase('fooBar'); // returns 'foo-bar'
 */
export const kebabCase = (s: string) => {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

/**
 * Creates an object with keys transformed using provided `iteratee` function, which takes each value and the corresponding key.
 *
 * @param obj - The source object.
 * @param iteratee - The function invoked per iteration to transform the keys.
 *
 * @returns A new object with keys transformed by `iteratee`.
 *
 * @example
 * mapKeys({ a: 1, b: 2 }, (value, key) => key + value); // returns { a1: 1, b2: 2 }
 */
export const mapKeys = (
  obj: Record<string, any>,
  iteratee: (value: any, key: string) => any,
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [iteratee(value, key), value]),
  );
};

/**
 * Retrieves the value at a given path of a provided object safely. If the path does not exist,
 * the function returns a default value, if provided.
 *
 * @param object - The object from which to retrieve the property.
 * @param path - A dot notation string or an array of strings and numbers indicating the path of the property in the object.
 *               Dot notation can also include array indices in bracket notation (e.g., 'a.b[0].c').
 * @param defaultValue - The value to return if the resolved value is `undefined`. This parameter is optional.
 *
 * @returns The value from the object at the specified path, or the default value if the path is not resolved.
 *
 * @example
 * const obj = { a: { b: [{ c: 3 }] } };
 *
 * // Using string path with dot and bracket notation
 * get(obj, 'a.b[0].c'); // returns 3
 *
 * // Using array path
 * get(obj, ['a', 'b', 0, 'c']); // returns 3
 *
 * // Using default value for non-existent path
 * get(obj, 'a.b[1].c', 'not found'); // returns 'not found'
 */
export const get = (
  object: Record<string, any>,
  path: string | (string | number)[],
  defaultValue?: any,
): any => {
  const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, ".$1").split(".");

  let res: any = object;

  for (const key of keys) {
    res = res?.[key];

    if (res === undefined) {
      return defaultValue;
    }
  }

  return res;
};

/**
 * Computes the list of values that are the intersection of all provided arrays,
 * with each element being transformed by the given iteratee, which can be a function or property name.
 *
 * @param args - A rest parameter that collects all arrays to intersect followed by an iteratee.
 * The last element in `args` is the iteratee, which can be either a function or a property name string.
 * The rest are arrays of elements of type T.
 *
 * @returns An array of elements of type T that exist in all arrays after being transformed by the iteratee.
 *
 * @throws {Error} If less than two arguments are provided or if the iteratee is not a function or a valid property string.
 *
 * @typeParam T - The type of elements in the input arrays.
 *
 * @example
 * // Using a function as an iteratee
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // returns [2.1]
 *
 * // Using a property name as an iteratee
 * intersectionBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], 'x'); // returns [{ x: 1 }]
 */
export const intersectionBy = <T>(...args: [...arrays: T[][], iteratee: Iteratee<T>]): T[] => {
  if (args.length < 2) {
    throw new Error("intersectionBy requires at least two arrays and an iteratee");
  }

  const iteratee = args[args.length - 1];
  const arrays = args.slice(0, -1) as T[][];

  if (arrays.length === 0) {
    return [];
  }

  const getIterateeValue = (item: T): unknown => {
    if (typeof iteratee === "function") {
      return (iteratee as (value: T) => any)(item);
    } else if (typeof iteratee === "string") {
      return (item as any)[iteratee];
    } else {
      throw new Error("Iteratee must be a function or a string key of the array elements");
    }
  };

  const [first, ...rest] = arrays;
  const transformedFirst = first.map((item) => getIterateeValue(item));

  const transformedSets: Set<unknown>[] = rest.map(
    (array) => new Set(array.map((item) => getIterateeValue(item))),
  );

  const res: T[] = [];
  const seen = new Set<unknown>();

  for (let i = 0; i < first.length; i++) {
    const item = first[i];
    const transformed = transformedFirst[i];

    if (seen.has(transformed)) {
      continue;
    }

    const existsInAll = transformedSets.every((set) => set.has(transformed));

    if (existsInAll) {
      res.push(item);
      seen.add(transformed);
    }
  }

  return res;
};
