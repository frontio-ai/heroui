import type {DateValue} from "@internationalized/date";
import type {DateInputProps} from "@heroui/date-input";
import type {DatePickerState} from "@react-stately/datepicker";
import type {ButtonProps} from "@heroui/button";
import type {CalendarProps} from "@heroui/calendar";
import type {PopoverProps} from "@heroui/popover";
import type {UseDatePickerBaseProps} from "./use-date-picker-base";
import type {DOMAttributes} from "@heroui/system";
import type {DatePickerSlots, SlotsToClasses} from "@heroui/theme";

import {useProviderContext} from "@heroui/system";
import {useMemo, useRef} from "react";
import {datePicker} from "@heroui/theme";
import {useDatePickerState} from "@react-stately/datepicker";
import {AriaDatePickerProps, useDatePicker as useAriaDatePicker} from "@react-aria/datepicker";
import {clsx, dataAttr, objectToDeps} from "@heroui/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {FormContext, useSlottedContext} from "@heroui/form";
import {ariaShouldCloseOnInteractOutside} from "@heroui/aria-utils";

import {useDatePickerBase} from "./use-date-picker-base";

interface Props<T extends DateValue> extends UseDatePickerBaseProps<T> {}

interface Props<T extends DateValue>
  extends Omit<UseDatePickerBaseProps<T>, keyof AriaDatePickerProps<T>> {
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <DatePicker classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    calendar:"calendar-classes",
   *    selectorButton:"selector-button-classes",
   *    selectorIcon:"selector-icon-classes",
   *    popoverContent:"popover-content-classes",
   *    calendarContent : "calendar-content-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    input: "input-classes",
   *    segment: "segment-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<DatePickerSlots> & DateInputProps<T>["classNames"];
}

export type UseDatePickerProps<T extends DateValue> = Props<T> & AriaDatePickerProps<T>;

export function useDatePicker<T extends DateValue>({
  className,
  classNames,
  ...originalProps
}: UseDatePickerProps<T>) {
  const globalContext = useProviderContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};

  const validationBehavior =
    originalProps.validationBehavior ??
    formValidationBehavior ??
    globalContext?.validationBehavior ??
    "native";

  const {
    domRef,
    startContent,
    endContent,
    selectorIcon,
    createCalendar,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    slotsProps,
    timeMinValue,
    timeMaxValue,
    CalendarBottomContent,
    dateInputProps,
    timeInputProps,
    popoverProps,
    calendarProps,
    variantProps,
    userTimeInputProps,
    selectorButtonProps,
    selectorIconProps,
    onClose,
  } = useDatePickerBase({...originalProps, validationBehavior});

  let state: DatePickerState = useDatePickerState({
    ...originalProps,
    validationBehavior,
    shouldCloseOnSelect: () => !state.hasTime,
    onOpenChange: (isOpen) => {
      if (!isOpen) {
        onClose();
      }
    },
  });

  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      datePicker({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps: ariaCalendarProps,
    descriptionProps,
    errorMessageProps,
  } = useAriaDatePicker({...originalProps, validationBehavior}, state, domRef);

  // Time field values
  originalProps.maxValue && "hour" in originalProps.maxValue ? originalProps.maxValue : null;
  const timeGranularity =
    state.granularity === "hour" || state.granularity === "minute" || state.granularity === "second"
      ? state.granularity
      : null;

  const showTimeField = !!timeGranularity;

  const getDateInputProps = () => {
    return {
      ...dateInputProps,
      classNames,
      groupProps,
      labelProps,
      createCalendar,
      errorMessageProps,
      descriptionProps,
      ...mergeProps(variantProps, fieldProps, {
        minValue: originalProps.minValue,
        maxValue: originalProps.maxValue,
        fullWidth: true,
        disableAnimation,
      }),
      className: slots.base({class: baseStyles}),
      innerWrapperProps: {
        ref: popoverTriggerRef,
      },
      "data-open": dataAttr(state.isOpen),
    } as DateInputProps;
  };

  const getTimeInputProps = () => {
    if (!showTimeField) return {};

    return {
      ...timeInputProps,
      value: state.timeValue,
      onChange: state.setTimeValue,
      granularity: timeGranularity,
      minValue: timeMinValue ?? undefined,
      maxValue: timeMaxValue ?? undefined,
      classNames: {
        base: slots.timeInput({
          class: clsx(classNames?.timeInput, userTimeInputProps?.classNames?.base),
        }),
        label: slots.timeInputLabel({
          class: clsx(classNames?.timeInputLabel, userTimeInputProps?.classNames?.label),
        }),
      },
    };
  };

  const getPopoverProps = (props: DOMAttributes = {}): PopoverProps => {
    return {
      state,
      dialogProps,
      ...popoverProps,
      triggerRef: popoverTriggerRef,
      classNames: {
        content: slots.popoverContent({
          class: clsx(
            classNames?.popoverContent,
            slotsProps.popoverProps?.classNames?.["content"],
            props.className,
          ),
        }),
      },
      shouldCloseOnInteractOutside: popoverProps?.shouldCloseOnInteractOutside
        ? popoverProps.shouldCloseOnInteractOutside
        : (element: Element) => ariaShouldCloseOnInteractOutside(element, popoverTriggerRef, state),
    };
  };

  const getCalendarProps = (): CalendarProps => {
    return {
      ...ariaCalendarProps,
      ...calendarProps,
      classNames: {
        ...calendarProps.classNames,
        base: slots.calendar({class: clsx(classNames?.base, calendarProps.classNames?.base)}),
        content: slots.calendarContent({
          class: clsx(classNames?.calendarContent, calendarProps.classNames?.content),
        }),
      },
    };
  };

  const getSelectorButtonProps = (): ButtonProps => {
    return {
      ...buttonProps,
      ...selectorButtonProps,
      onPress: state.toggle,
      className: slots.selectorButton({class: classNames?.selectorButton}),
    };
  };

  const getSelectorIconProps = () => {
    return {
      ...selectorIconProps,
      className: slots.selectorIcon({class: classNames?.selectorIcon}),
    };
  };

  return {
    state,
    startContent,
    endContent,
    selectorIcon,
    showTimeField,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    getDateInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getCalendarProps,
    getTimeInputProps,
    getSelectorIconProps,
  };
}

export type UseDatePickerReturn = ReturnType<typeof useDatePicker>;
