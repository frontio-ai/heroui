import type {DateValue} from "@internationalized/date";
import type {AriaDatePickerBaseProps} from "@react-types/datepicker";
import type {DateInputProps, TimeInputProps} from "@nextui-org/date-input";
import type {ButtonProps} from "@nextui-org/button";
import type {CalendarProps} from "@nextui-org/calendar";
import type {PopoverProps} from "@nextui-org/popover";
import type {ReactNode} from "react";

import {
  DatePickerVariantProps,
  DatePickerSlots,
  SlotsToClasses,
  dateInput,
} from "@nextui-org/theme";
import {useMemo, useState} from "react";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {datePicker} from "@nextui-org/theme";
import {mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {useLocalizedStringFormatter} from "@react-aria/i18n";

import intlMessages from "../intl/messages";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaDatePickerBaseProps<T> | "onChange"
>;

interface Props<T extends DateValue> extends NextUIBaseProps<T> {
  /**
   * The icon to toggle the date picker popover. Usually a calendar icon.
   */
  selectorIcon?: ReactNode;
  /**
   * Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration.
   * @default visible
   */
  pageBehavior?: CalendarProps["pageBehavior"];
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * Passing a number greater than 1 will disable the `showMonthAndYearPickers` prop.
   *
   * @default 1
   */
  visibleMonths?: CalendarProps["visibleMonths"];
  /**
   * The width to be applied to the calendar component.
   *
   * @default 256
   */
  calendarWidth?: number;
  /**
   * Top content to be rendered in the calendar component.
   */
  CalendarTopContent?: CalendarProps["topContent"];
  /**
   * Bottom content to be rendered in the calendar component.
   */
  CalendarBottomContent?: CalendarProps["bottomContent"];
  /**
   * Whether the calendar should show month and year pickers.
   *
   * @default false
   */
  showMonthAndYearPickers?: CalendarProps["showMonthAndYearPickers"];
  /**
   * Props to be passed to the popover component.
   *
   * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 13 }
   */
  popoverProps?: Partial<PopoverProps>;
  /**
   * Props to be passed to the selector button component.
   * @default { size: "sm", variant: "light", radius: "full", isIconOnly: true }
   */
  selectorButtonProps?: Partial<ButtonProps>;
  /**
   * Props to be passed to the calendar component.
   * @default {}
   */
  calendarProps?: Partial<Omit<CalendarProps, "topContent" | "bottomContent">>;

  /**
   * Props to be passed to the time input component.
   *
   * @default {}
   */
  timeInputProps?: TimeInputProps;
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
   */
  isDateUnavailable?: CalendarProps["isDateUnavailable"];
  /**
   * Whether to disable all animations in the date picker. Including the DateInput, Button, Calendar, and Popover.
   *
   * @default false
   */
  disableAnimation?: boolean;
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

type Variants =
  | "color"
  | "size"
  | "isDisabled"
  | "disableAnimation"
  | "variant"
  | "radius"
  | "labelPlacement"
  | "fullWidth";

export type UseDatePickerBaseProps<T extends DateValue> = Props<T> &
  DatePickerVariantProps &
  Pick<
    DateInputProps<T>,
    Variants | "ref" | "createCalendar" | "startContent" | "endContent" | "inputRef"
  > &
  Omit<AriaDatePickerBaseProps<T>, "minValue" | "maxValue">;

export function useDatePickerBase<T extends DateValue>(originalProps: UseDatePickerBaseProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);

  const [isCalendarHeaderExpanded, setIsCalendarHeaderExpanded] = useState(false);

  const {
    as,
    ref,
    label,
    selectorIcon,
    inputRef,
    isInvalid,
    errorMessage,
    description,
    startContent,
    endContent,
    validationState,
    validationBehavior,
    visibleMonths = 1,
    pageBehavior = "visible",
    calendarWidth = 256,
    isDateUnavailable,
    shouldForceLeadingZeros,
    showMonthAndYearPickers = false,
    selectorButtonProps: userSelectorButtonProps = {},
    popoverProps: userPopoverProps = {},
    timeInputProps: userTimeInputProps = {},
    calendarProps: userCalendarProps = {},
    CalendarTopContent,
    CalendarBottomContent,
    createCalendar,
    className,
    classNames,
  } = props;

  const domRef = useDOMRef(ref);
  const disableAnimation = originalProps.disableAnimation ?? false;

  const baseStyles = clsx(classNames?.base, className);

  let stringFormatter = useLocalizedStringFormatter(intlMessages);

  const isDefaultColor = originalProps.color === "default" || !originalProps.color;
  const hasMultipleMonths = visibleMonths > 1;

  // Time field values
  const placeholder = originalProps?.placeholderValue;
  const timePlaceholder = placeholder && "hour" in placeholder ? placeholder : null;

  const slotsProps: {
    popoverProps: UseDatePickerBaseProps<T>["popoverProps"];
    selectorButtonProps: ButtonProps;
    calendarProps: CalendarProps;
  } = {
    popoverProps: mergeProps(
      {
        offset: 13,
        placement: "bottom",
        triggerScaleOnOpen: false,
        disableAnimation,
      },
      userPopoverProps,
    ),
    selectorButtonProps: mergeProps(
      {
        isIconOnly: true,
        radius: "full",
        size: "sm",
        variant: "light",
        disableAnimation,
      },
      userSelectorButtonProps,
    ),
    calendarProps: mergeProps(
      {
        showHelper: false,
        visibleMonths,
        pageBehavior,
        isDateUnavailable,
        showMonthAndYearPickers,
        onHeaderExpandedChange: setIsCalendarHeaderExpanded,
        color:
          (originalProps.variant === "bordered" || originalProps.variant === "underlined") &&
          isDefaultColor
            ? "foreground"
            : isDefaultColor
            ? "primary"
            : originalProps.color,
        disableAnimation,
      },
      userCalendarProps,
    ),
  };

  const slots = useMemo(
    () =>
      datePicker({
        ...variantProps,
        hasMultipleMonths,
        className,
      }),
    [objectToDeps(variantProps), hasMultipleMonths, className],
  );

  const dateInputProps = {
    as,
    label,
    ref: domRef,
    inputRef,
    description,
    startContent,
    validationState,
    validationBehavior,
    shouldForceLeadingZeros,
    isInvalid,
    errorMessage,
    "data-invalid": dataAttr(originalProps?.isInvalid),
    className: slots.base({class: baseStyles}),
    classNames,
  } as DateInputProps;

  const timeInputProps = {
    ...userTimeInputProps,
    size: "sm",
    labelPlacement: "outside-left",
    classNames: {
      base: slots.timeInput({
        class: clsx(classNames?.timeInput, userTimeInputProps?.classNames?.base),
      }),
      label: slots.timeInputLabel({
        class: clsx(classNames?.timeInputLabel, userTimeInputProps?.classNames?.label),
      }),
    },
    label: userTimeInputProps?.label || stringFormatter.format("time"),
    placeholderValue: timePlaceholder,
    hourCycle: props.hourCycle,
    hideTimeZone: props.hideTimeZone,
  } as TimeInputProps;

  const popoverProps = {
    ...mergeProps(slotsProps.popoverProps, props),
    triggerRef: domRef,
    classNames: {
      content: slots.popoverContent({
        class: clsx(
          classNames?.popoverContent,
          slotsProps.popoverProps?.classNames?.["content"],
          props.className,
        ),
      }),
    },
  } as PopoverProps;

  const calendarProps = {
    ...slotsProps.calendarProps,
    "data-slot": "calendar",
    classNames: {
      base: slots.calendar({class: classNames?.calendar}),
      content: slots.calendarContent({class: classNames?.calendarContent}),
    },
    style: mergeProps(
      hasMultipleMonths
        ? {
            // @ts-ignore
            "--visible-months": visibleMonths,
          }
        : {},
      {"--calendar-width": `${calendarWidth}px`},
      slotsProps.calendarProps.style,
    ),
  } as CalendarProps;

  const selectorButtonProps = {
    ...slotsProps.selectorButtonProps,
    "data-slot": "selector-button",
    className: slots.selectorButton({class: classNames?.selectorButton}),
  } as ButtonProps;

  const selectorIconProps = {
    "data-slot": "selector-icon",
    className: slots.selectorIcon({class: classNames?.selectorIcon}),
  };

  return {
    domRef,
    endContent,
    selectorIcon,
    createCalendar,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    variantProps,
    dateInputProps,
    timeInputProps,
    popoverProps,
    calendarProps,
    selectorButtonProps,
    selectorIconProps,
  };
}

export type UseDatePickerBaseReturn = ReturnType<typeof useDatePickerBase>;
