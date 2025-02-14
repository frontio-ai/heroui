import {useEffect, useRef} from "react";

/**
 * Holds the previous value of the provided [value] parameter
 *
 * @param value
 * @returns
 */
function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
export default usePrevious;
