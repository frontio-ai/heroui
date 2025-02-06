import type {DateValue, AriaRangeCalendarProps} from "@react-types/calendar";
import type {HTMLHeroUIProps} from "@heroui/system";
import type {RangeCalendarState} from "@react-stately/calendar";

import {useMemo, useRef} from "react";
import {filterDOMProps} from "@heroui/react-utils";
import {useRangeCalendar as useAriaRangeCalendar} from "@react-aria/calendar";
import {useRangeCalendarState} from "@react-stately/calendar";
import {createCalendar} from "@heroui/internationalized-date";
import {clsx} from "@heroui/shared-utils";
import {ButtonProps} from "@heroui/button";
import {chain} from "@react-aria/utils";

import {ContextType, useCalendarBase, UseCalendarBaseProps} from "./use-calendar-base";
import {CalendarBaseProps} from "./calendar-base";

type HeroUIBaseProps<T extends DateValue> = Omit<
  HTMLHeroUIProps<"div">,
  keyof AriaRangeCalendarProps<T>
>;

interface Props<T extends DateValue> extends UseCalendarBaseProps, HeroUIBaseProps<T> {}

export type UseRangeCalendarProps<T extends DateValue> = Props<T> & AriaRangeCalendarProps<T>;

export function useRangeCalendar<T extends DateValue>({
  buttonPickerProps: buttonPickerPropsProp,
  className,
  ...originalProps
}: UseRangeCalendarProps<T>) {
  const {
    Component,
    slots,
    children,
    domRef,
    locale,
    showHelper,
    minValue,
    maxValue,
    weekdayStyle,
    visibleDuration,
    shouldFilterDOMProps,
    isHeaderExpanded,
    visibleMonths,
    disableAnimation,
    createCalendar: createCalendarProp,
    showMonthAndYearPickers,
    baseProps,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
    setIsHeaderExpanded,
    topContent,
    bottomContent,
    errorMessage,
    classNames,
    otherProps,
  } = useCalendarBase({...originalProps, isRange: true});

  const headerRef = useRef<HTMLElement>(null);

  const state = useRangeCalendarState({
    ...originalProps,
    locale,
    minValue,
    maxValue,
    visibleDuration,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const {title, calendarProps, prevButtonProps, nextButtonProps, errorMessageProps} =
    useAriaRangeCalendar(originalProps, state, domRef);

  const baseStyles = clsx(classNames?.base, className);

  const buttonPickerProps: ButtonProps = {
    ...buttonPickerPropsProp,
    onPress: chain(buttonPickerPropsProp?.onPress, () => setIsHeaderExpanded(!isHeaderExpanded)),
  };

  const getBaseCalendarProps = (props = {}): CalendarBaseProps => {
    return {
      ...baseProps,
      Component,
      showHelper,
      topContent,
      bottomContent,
      buttonPickerProps,
      calendarRef: domRef,
      calendarProps: calendarProps,
      prevButtonProps: getPrevButtonProps(prevButtonProps),
      nextButtonProps: getNextButtonProps(nextButtonProps),
      errorMessageProps: getErrorMessageProps(errorMessageProps),
      className: slots.base({class: baseStyles}),
      errorMessage,
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  const context = useMemo<ContextType<RangeCalendarState>>(
    () => ({
      state,
      slots,
      headerRef,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      showMonthAndYearPickers,
      classNames,
      disableAnimation,
    }),
    [
      state,
      slots,
      classNames,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      disableAnimation,
      showMonthAndYearPickers,
    ],
  );

  return {
    Component,
    children,
    domRef,
    context,
    state,
    slots,
    title,
    classNames,
    getBaseCalendarProps,
  };
}

export type UseRangeCalendarReturn = ReturnType<typeof useRangeCalendar>;
