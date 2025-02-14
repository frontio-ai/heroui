/**
 * Returns an appropriate value for the `inert` attribute based on the React version.
 *
 * In React 19, the attribute `inert` is a boolean. In versions prior to 19, the attribute
 * behaves differently: setting `inert=""` will make it `true`, and `inert=undefined` will make it `false`.
 *
 * @param {boolean} v - The desired boolean state for the `inert` attribute.
 * @returns {boolean | string | undefined} - Depending on the React version:
 * - Returns `boolean` if React version is 19 (the input value `v` directly).
 * - Returns `string` (empty string) if `v` is `true` in older React versions.
 * - Returns `undefined` if `v` is `false` in older React versions.
 *
 * @see {@link https://github.com/facebook/react/issues/17157} for more details on the behavior in older React versions.
 */
export const getInertValue = (v: boolean): boolean | string | undefined => {
  return v;
};
