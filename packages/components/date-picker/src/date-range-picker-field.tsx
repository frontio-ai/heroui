import type {DateInputReturnType, DateInputSlots, SlotsToClasses} from "@heroui/theme";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {HTMLHeroUIProps} from "@heroui/system";
import type {DateInputProps} from "@heroui/date-input";

import {createCalendar} from "@heroui/internationalized-date";
import {forwardRef, useRef} from "react";
import {DateValue} from "@react-types/datepicker";
import {useDateField as useAriaDateField} from "@react-aria/datepicker";
import {ForwardedRef, ReactElement} from "react";
import {useDateFieldState} from "@react-stately/datepicker";
import {DateInputSegment} from "@heroui/date-input";
import {filterDOMProps, useDOMRef} from "@heroui/react-utils";
import {useLocale} from "@heroui/react-aria-i18n";
import {mergeProps} from "@react-aria/utils";

type HeroUIBaseProps<T extends DateValue> = Omit<
  HTMLHeroUIProps<"div">,
  keyof AriaDatePickerProps<T> | "onChange"
>;

export interface Props<T extends DateValue>
  extends HeroUIBaseProps<T>,
    AriaDatePickerProps<T>,
    Pick<DateInputProps, "createCalendar"> {
  /** DateInput classes slots. */
  slots: DateInputReturnType;
  /** DateInput classes. */
  classNames?: SlotsToClasses<DateInputSlots>;
}

export type DateRangePickerFieldProps<T extends DateValue = DateValue> = Props<T>;

const DateRangePickerField = forwardRef(function DateRangePickerField<T extends DateValue>(
  props: DateRangePickerFieldProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, slots, createCalendar: createCalendarProp, classNames, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {locale} = useLocale();

  let state = useDateFieldState({
    ...otherProps,
    locale,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const inputRef = useRef(null);

  const {
    fieldProps,
    inputProps,
    isInvalid: ariaIsInvalid,
  } = useAriaDateField({...otherProps, inputRef}, state, domRef);

  const isInvalid = props.isInvalid || ariaIsInvalid;

  state.isInvalid = isInvalid;

  return (
    <Component {...mergeProps(fieldProps, filterDOMProps(otherProps))} ref={domRef}>
      {state.segments.map((segment, i) => (
        <DateInputSegment
          key={i}
          classNames={classNames}
          segment={segment}
          slots={slots}
          state={state}
        />
      ))}
      <input {...inputProps} ref={inputRef} />
    </Component>
  );
}) as <T extends DateValue>(props: DateRangePickerFieldProps<T>) => ReactElement;

export default DateRangePickerField;
