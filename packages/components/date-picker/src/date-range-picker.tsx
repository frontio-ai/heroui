import type {DateValue} from "@heroui/internationalized-date";

import {ForwardedRef, ReactElement, useMemo} from "react";
import {cloneElement, isValidElement} from "react";
import {forwardRef} from "@heroui/system";
import {Button} from "@heroui/button";
import {TimeInput, DateInputGroup} from "@heroui/date-input";
import {FreeSoloPopover} from "@heroui/popover";
import {RangeCalendar} from "@heroui/calendar";
import {AnimatePresence} from "@heroui/motion";
import {CalendarBoldIcon} from "@heroui/shared-icons";

import DateRangePickerField from "./date-range-picker-field";
import {UseDateRangePickerProps, useDateRangePicker} from "./use-date-range-picker";

export interface Props<T extends DateValue> extends UseDateRangePickerProps<T> {
  /**
   * The placement of the selector button.
   * @default "end"
   */
  selectorButtonPlacement?: "start" | "end";
}

export type DateRangePickerProps<T extends DateValue = DateValue> = Props<T>;

const DateRangePicker = forwardRef(function DateRangePicker<T extends DateValue>(
  props: DateRangePickerProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {selectorButtonPlacement = "end", ...otherProps} = props;

  const {
    state,
    slots,
    startContent,
    endContent,
    selectorIcon,
    showTimeField,
    classNames,
    disableAnimation,
    isCalendarHeaderExpanded,
    getDateInputGroupProps,
    getStartDateInputProps,
    getEndDateInputProps,
    getPopoverProps,
    getSeparatorProps,
    getStartTimeInputProps,
    getEndTimeInputProps,
    getSelectorButtonProps,
    getSelectorIconProps,
    getCalendarProps,
    CalendarTopContent,
    CalendarBottomContent,
  } = useDateRangePicker<T>({...otherProps, ref});

  const selectorContent = isValidElement(selectorIcon) ? (
    cloneElement(selectorIcon, getSelectorIconProps())
  ) : (
    <CalendarBoldIcon {...getSelectorIconProps()} />
  );

  const calendarBottomContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return showTimeField ? (
      <div className={slots?.bottomContent({class: classNames?.bottomContent})}>
        <div className={slots?.timeInputWrapper({class: classNames?.timeInputWrapper})}>
          <TimeInput {...getStartTimeInputProps()} />
          <TimeInput {...getEndTimeInputProps()} />
        </div>
        {CalendarBottomContent}
      </div>
    ) : (
      CalendarBottomContent
    );
  }, [state, showTimeField, CalendarBottomContent, isCalendarHeaderExpanded]);

  const calendarTopContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return CalendarTopContent;
  }, [showTimeField, CalendarTopContent, isCalendarHeaderExpanded]);

  const popoverContent = state.isOpen ? (
    <FreeSoloPopover {...getPopoverProps()} offset={20}>
      <RangeCalendar
        {...getCalendarProps()}
        bottomContent={calendarBottomContent}
        topContent={calendarTopContent}
      />
    </FreeSoloPopover>
  ) : null;

  const dateInputGroupProps = {
    ...getDateInputGroupProps(),
    endContent:
      selectorButtonPlacement === "end" ? (
        <Button {...getSelectorButtonProps()}>{endContent || selectorContent}</Button>
      ) : (
        endContent
      ),
    startContent:
      selectorButtonPlacement === "start" ? (
        <Button {...getSelectorButtonProps()}>{startContent || selectorContent}</Button>
      ) : (
        startContent
      ),
  };

  return (
    <>
      <DateInputGroup {...dateInputGroupProps}>
        <DateRangePickerField {...getStartDateInputProps()} />
        <span {...getSeparatorProps()} aria-hidden="true" role="separator">
          -
        </span>
        <DateRangePickerField {...getEndDateInputProps()} />
      </DateInputGroup>

      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </>
  );
}) as <T extends DateValue>(props: DateRangePickerProps<T>) => ReactElement;

export default DateRangePicker;
