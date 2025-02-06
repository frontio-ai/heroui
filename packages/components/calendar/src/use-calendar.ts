import type {DateValue, AriaCalendarProps} from "@react-types/calendar";
import type {ButtonProps} from "@heroui/button";
import type {CalendarState} from "@react-stately/calendar";

import {useMemo, useRef} from "react";
import {filterDOMProps} from "@heroui/react-utils";
import {useCalendar as useAriaCalendar} from "@react-aria/calendar";
import {useCalendarState} from "@react-stately/calendar";
import {createCalendar} from "@heroui/internationalized-date";
import {clsx} from "@heroui/shared-utils";
import {chain, mergeProps} from "@react-aria/utils";

import {ContextType, useCalendarBase, UseCalendarBaseProps} from "./use-calendar-base";
import {CalendarBaseProps} from "./calendar-base";

export type UseCalendarProps<T extends DateValue> = UseCalendarBaseProps & AriaCalendarProps<T>;

export function useCalendar<T extends DateValue>({
  buttonPickerProps: buttonPickerPropsProp,
  className,
  ...originalProps
}: UseCalendarProps<T>) {
  const {
    Component,
    slots,
    children,
    domRef,
    locale,
    minValue,
    maxValue,
    showHelper,
    weekdayStyle,
    visibleDuration,
    baseProps,
    disableAnimation,
    shouldFilterDOMProps,
    isHeaderExpanded,
    visibleMonths,
    createCalendar: createCalendarProp,
    showMonthAndYearPickers,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
    setIsHeaderExpanded,
    topContent,
    bottomContent,
    errorMessage,
    classNames,
    otherProps,
  } = useCalendarBase(originalProps);

  const headerRef = useRef<HTMLElement>(null);

  const state = useCalendarState({
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
    useAriaCalendar(originalProps, state);

  const baseStyles = clsx(classNames?.base, className);

  const buttonPickerProps: ButtonProps = {
    ...mergeProps(buttonPickerPropsProp, {isDisabled: originalProps.isDisabled}),
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

  const context = useMemo<ContextType<CalendarState>>(
    () => ({
      state,
      slots,
      headerRef,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      classNames,
      showMonthAndYearPickers,
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

export type UseCalendarReturn = ReturnType<typeof useCalendar>;
