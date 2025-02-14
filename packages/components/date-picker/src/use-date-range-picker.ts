import type {DateValue} from "@internationalized/date";
import type {TimeInputProps} from "@heroui/date-input";
import type {ButtonProps} from "@heroui/button";
import type {RangeCalendarProps} from "@heroui/calendar";
import type {PopoverProps} from "@heroui/popover";
import type {DOMAttributes, GroupDOMAttributes} from "@react-types/shared";
import type {AriaDateRangePickerProps} from "@react-types/datepicker";
import type {DateRangePickerState} from "@react-stately/datepicker";
import type {UseDatePickerBaseProps} from "./use-date-picker-base";
import type {PropGetter} from "@heroui/system";
import type {DateRangePickerFieldProps} from "./date-range-picker-field";
import type {DateInputGroupProps} from "@heroui/date-input";
import type {DateRangePickerSlots, SlotsToClasses} from "@heroui/theme";
import type {DateInputProps} from "@heroui/date-input";

import {useLabelPlacement, useProviderContext} from "@heroui/system";
import {useMemo, useRef} from "react";
import {useDateRangePickerState} from "@react-stately/datepicker";
import {useDateRangePicker as useAriaDateRangePicker} from "@react-aria/datepicker";
import {clsx, dataAttr, objectToDeps} from "@heroui/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {dateRangePicker, dateInput, cn} from "@heroui/theme";
import {FormContext, useSlottedContext} from "@heroui/form";
import {ariaShouldCloseOnInteractOutside} from "@heroui/aria-utils";

import {useDatePickerBase} from "./use-date-picker-base";
interface Props<T extends DateValue>
  extends Omit<UseDatePickerBaseProps<T>, keyof AriaDateRangePickerProps<T>> {
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <DateRangePicker classNames={{
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
   *    separator: "separator-classes",
   *    bottomContent: "bottom-content-classes",
   *    timeInputWrapper: "time-input-wrapper-classes",
   *    timeInputLabel: "time-input-label-classes",
   *    timeInput: "time-input-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<DateRangePickerSlots> & DateInputProps<T>["classNames"];
}

export type UseDateRangePickerProps<T extends DateValue> = Props<T> & AriaDateRangePickerProps<T>;

export function useDateRangePicker<T extends DateValue>({
  as,
  label,
  isInvalid: isInvalidProp,
  description,
  startContent,
  endContent,
  selectorIcon,
  errorMessage,
  className,
  classNames,
  ...originalProps
}: UseDateRangePickerProps<T>) {
  const globalContext = useProviderContext();

  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};
  const validationBehavior =
    originalProps.validationBehavior ??
    formValidationBehavior ??
    globalContext?.validationBehavior ??
    "native";

  const {
    domRef,
    slotsProps,
    createCalendar,
    stringFormatter,
    timeMinValue,
    timeMaxValue,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    timeInputProps,
    popoverProps,
    calendarProps,
    variantProps,
    userTimeInputProps,
    hasMultipleMonths,
    selectorButtonProps,
    selectorIconProps,
  } = useDatePickerBase({...originalProps, validationBehavior});

  let state: DateRangePickerState = useDateRangePickerState({
    ...originalProps,
    validationBehavior,
    shouldCloseOnSelect: () => !state.hasTime,
  });

  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps: ariaCalendarProps,
    validationDetails,
    validationErrors,
    descriptionProps,
    errorMessageProps,
    isInvalid: isAriaInvalid,
  } = useAriaDateRangePicker({...originalProps, validationBehavior}, state, domRef);

  const isInvalid = isInvalidProp || isAriaInvalid;

  const slots = useMemo(
    () =>
      dateRangePicker({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  // Time field values

  const timeGranularity =
    state.granularity === "hour" || state.granularity === "minute" || state.granularity === "second"
      ? state.granularity
      : null;

  const showTimeField = !!timeGranularity;

  const labelPlacement = useLabelPlacement({
    labelPlacement: originalProps.labelPlacement,
    label,
  });

  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";

  /**
   * ------------------------------
   * DateRangePicker Props
   * ------------------------------
   */
  const getStartTimeInputProps = () => {
    if (!showTimeField) return {};

    return {
      ...timeInputProps,
      label: stringFormatter.format("startTime"),
      value: state.timeRange?.start || null,
      onChange: (v) => state.setTime("start", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
      classNames: {
        base: slots.timeInput({
          class: clsx(classNames?.timeInput, userTimeInputProps?.classNames?.base),
        }),
        label: slots.timeInputLabel({
          class: clsx(classNames?.timeInputLabel, userTimeInputProps?.classNames?.label),
        }),
      },
    } as TimeInputProps;
  };

  const getEndTimeInputProps = () => {
    if (!showTimeField) return {};

    return {
      ...timeInputProps,
      label: stringFormatter.format("endTime"),
      value: state.timeRange?.end || null,
      onChange: (v) => state.setTime("end", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
      classNames: {
        base: slots.timeInput({
          class: clsx(classNames?.timeInput, userTimeInputProps?.classNames?.base),
        }),
        label: slots.timeInputLabel({
          class: clsx(classNames?.timeInputLabel, userTimeInputProps?.classNames?.label),
        }),
      },
    } as TimeInputProps;
  };

  const getPopoverProps = (props: DOMAttributes = {}) => {
    return {
      state,
      dialogProps,
      ...props,
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
        shouldCloseOnInteractOutside: popoverProps?.shouldCloseOnInteractOutside
          ? popoverProps.shouldCloseOnInteractOutside
          : (element: Element) =>
              ariaShouldCloseOnInteractOutside(element, popoverTriggerRef, state),
      },
    } as PopoverProps;
  };

  const getCalendarProps = () => {
    return {
      ...ariaCalendarProps,
      ...calendarProps,
      classNames: {
        ...calendarProps.classNames,
        base: slots.calendar({class: cn(calendarProps?.classNames?.base, classNames?.calendar)}),
        content: slots.calendarContent({
          class: cn(calendarProps?.classNames?.content, classNames?.calendarContent),
        }),
      },
    } as RangeCalendarProps;
  };

  const getSelectorButtonProps = () => {
    return {
      ...buttonProps,
      ...selectorButtonProps,
      onPress: state.toggle,
      className: slots.selectorButton({class: classNames?.selectorButton}),
    } as ButtonProps;
  };

  const getSeparatorProps = () => {
    return {
      "data-slot": "separator",
      className: slots.separator({class: classNames?.separator}),
    };
  };

  const getSelectorIconProps = () => {
    return {
      ...selectorIconProps,
      className: slots.selectorIcon({class: classNames?.selectorIcon}),
    };
  };

  /**
   * ------------------------------
   * DateInput Props
   * ------------------------------
   */

  const baseStyles = clsx(classNames?.base, className);

  const dateInputSlots = useMemo(
    () =>
      dateInput({
        ...variantProps,
        labelPlacement,
      }),
    [objectToDeps(variantProps)],
  );

  const getStartDateInputProps = (props: DOMAttributes = {}) => {
    return {
      ...startFieldProps,
      isInvalid,
      "data-slot": "start-input",
      slots: dateInputSlots,
      createCalendar,
      ...mergeProps(variantProps, startFieldProps, {
        fullWidth: true,
        disableAnimation,
      }),
      "data-open": dataAttr(state.isOpen),
      classNames,
      style: {
        ...props.style,
        maxWidth: "fit-content",
      },
      className: dateInputSlots.input({
        class: clsx(classNames?.input, props?.className),
      }),
    } as DateRangePickerFieldProps;
  };

  const getEndDateInputProps = (props: DOMAttributes = {}) => {
    return {
      ...endFieldProps,
      isInvalid,
      "data-slot": "end-input",
      slots: dateInputSlots,
      createCalendar,
      ...mergeProps(variantProps, endFieldProps, {
        fullWidth: true,
        disableAnimation,
      }),
      "data-open": dataAttr(state.isOpen),
      classNames,
      className: dateInputSlots.input({
        class: clsx(classNames?.input, props?.className),
      }),
    } as DateRangePickerFieldProps;
  };

  const getLabelProps: PropGetter = (props) => {
    return {
      ...props,
      ...labelProps,
      "data-slot": "label",
      className: dateInputSlots.label({
        class: clsx(classNames?.label, props?.className),
      }),
    };
  };

  const getInputWrapperProps = (props = {}) => {
    return {
      ref: domRef,
      ...props,
      ...groupProps,
      "data-slot": "input-wrapper",
      className: dateInputSlots.inputWrapper({
        class: classNames?.inputWrapper,
      }),
      onClick: labelProps.onClick,
    } as GroupDOMAttributes;
  };

  const getInnerWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      ref: popoverTriggerRef,
      "data-slot": "inner-wrapper",
      className: dateInputSlots.innerWrapper({
        class: classNames?.innerWrapper,
      }),
    };
  };

  const getHelperWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "helper-wrapper",
      className: dateInputSlots.helperWrapper({
        class: clsx(classNames?.helperWrapper, props?.className),
      }),
    };
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ...errorMessageProps,
      "data-slot": "error-message",
      className: dateInputSlots.errorMessage({
        class: clsx(classNames?.errorMessage, props?.className),
      }),
    };
  };

  const getDescriptionProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ...descriptionProps,
      "data-slot": "description",
      className: dateInputSlots.description({
        class: clsx(classNames?.description, props?.className),
      }),
    };
  };

  const getDateInputGroupProps = () => {
    return {
      as,
      label,
      description,
      endContent,
      errorMessage,
      isInvalid,
      validationDetails,
      validationErrors,
      shouldLabelBeOutside,
      "data-slot": "base",
      "data-required": dataAttr(originalProps.isRequired),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-readonly": dataAttr(originalProps.isReadOnly),
      "data-invalid": dataAttr(isInvalid),
      "data-has-start-content": dataAttr(!!startContent),
      "data-has-multiple-months": dataAttr(hasMultipleMonths),
      "data-has-end-content": dataAttr(!!endContent),
      descriptionProps: getDescriptionProps(),
      errorMessageProps: getErrorMessageProps(),
      groupProps: getInputWrapperProps(),
      helperWrapperProps: getHelperWrapperProps(),
      labelProps: getLabelProps(),
      wrapperProps: getInnerWrapperProps(),
      className: dateInputSlots.base({class: baseStyles}),
    } as DateInputGroupProps;
  };

  return {
    state,
    label,
    slots,
    classNames,
    startContent,
    endContent,
    selectorIcon,
    showTimeField,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    getStartDateInputProps,
    getEndDateInputProps,
    getStartTimeInputProps,
    getEndTimeInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getCalendarProps,
    getSeparatorProps,
    getSelectorIconProps,
    getDateInputGroupProps,
  };
}

export type UseDateRangePickerReturn = ReturnType<typeof useDateRangePicker>;
