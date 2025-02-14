import {ClassValue} from "tailwind-variants";

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
export type SlotsToClasses<S extends string> = {
  [key in S]?: Exclude<ClassValue, 0n>;
};
