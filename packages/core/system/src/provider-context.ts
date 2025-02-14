import type {SpinnerVariants, SupportedCalendars} from "./types";
import type {Calendar} from "@internationalized/date";
import type {DateValue} from "@react-types/datepicker";

import {createContext} from "@heroui/react-utils";

export type ProviderContextProps = {
  /**
   * Whether to disable animations in the whole application.
   *
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Position where the label should appear.
   *
   * @default undefined
   */
  labelPlacement?: "inside" | "outside" | "outside-left" | undefined;
  /**
  /**
   * Whether to disable the ripple effect in the whole application.
   * If `disableAnimation` is set to `true`, this prop will be ignored.
   *
   * @default false
   */
  disableRipple?: boolean;
  /**
   * Whether to use native HTML form validation to prevent form submission
   * when the value is missing or invalid, or mark the field as required
   * or invalid via ARIA.
   * @see https://react-spectrum.adobe.com/react-aria/forms.html
   *
   * @default undefined
   */
  validationBehavior?: "aria" | "native";
  /**
   * The default dates range that can be selected in the calendar.
   */
  defaultDates?: {
    /**
     * The minimum date that can be selected in the calendar.
     * @see https://react-spectrum.adobe.com/internationalized/date/CalendarDate.html
     *
     * @default CalendarDate(1900, 1, 1)
     *
     */
    minDate?: DateValue;
    /**
     * The maximum date that can be selected in the calendar.
     * @see https://react-spectrum.adobe.com/internationalized/date/CalendarDate.html
     *
     * @default CalendarDate(2099, 12, 31)
     */
    maxDate?: DateValue;
  };
  /**
   * This function helps to reduce the bundle size by providing a custom calendar system.
   *
   * In the example above, the createCalendar function from the `@internationalized/date` package
   * is passed to the useCalendarState hook. This function receives a calendar identifier string,
   * and provides Calendar instances to React Stately, which are used to implement date manipulation.
   *
   * By default, this includes all calendar systems supported by @internationalized/date. However,
   * if your application supports a more limited set of regions, or you know you will only be picking dates
   * in a certain calendar system, you can reduce your bundle size by providing your own implementation
   * of `createCalendar` that includes a subset of these Calendar implementations.
   *
   * For example, if your application only supports Gregorian dates, you could implement a `createCalendar`
   * function like this:
   *
   * @example
   *
   * import {GregorianCalendar} from '@internationalized/date';
   *
   * function createCalendar(identifier) {
   *  switch (identifier) {
   *    case 'gregory':
   *      return new GregorianCalendar();
   *    default:
   *      throw new Error(`Unsupported calendar ${identifier}`);
   *  }
   * }
   *
   * This way, only GregorianCalendar is imported, and the other calendar implementations can be tree-shaken.
   *
   * @default all calendars
   */
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
  /**
   * The default variant of the spinner.
   * @default default
   */
  spinnerVariant?: SpinnerVariants;
};

export const [ProviderContext, useProviderContext] = createContext<ProviderContextProps>({
  name: "ProviderContext",
  strict: false,
});
