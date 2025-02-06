import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";
import type {CalendarSlots, SlotsToClasses, CalendarReturnType} from "@heroui/theme";

import {
  CalendarDate,
  getDayOfWeek,
  isSameDay,
  isSameMonth,
  isToday,
} from "@heroui/internationalized-date";
import {AriaCalendarCellProps, useCalendarCell} from "@react-aria/calendar";
import {HTMLHeroUIProps} from "@heroui/system";
import {mergeProps} from "@react-aria/utils";
import {useLocale} from "@heroui/react-aria-i18n";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {useRef} from "react";
import {dataAttr} from "@heroui/shared-utils";

export interface CalendarCellProps extends HTMLHeroUIProps<"td">, AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  isPickerVisible?: boolean;
  slots?: CalendarReturnType;
  classNames?: SlotsToClasses<CalendarSlots>;
  currentMonth: CalendarDate;
}

export function CalendarCell(originalProps: CalendarCellProps) {
  const {state, slots, isPickerVisible, currentMonth, classNames, ...props} = originalProps;

  const ref = useRef<HTMLButtonElement>(null);

  const {
    cellProps,
    buttonProps,
    isPressed,
    isSelected,
    isDisabled,
    isFocused,
    isInvalid,
    formattedDate,
  } = useCalendarCell(
    {
      ...props,
      isDisabled: !isSameMonth(props.date, currentMonth) || isPickerVisible,
    },
    state,
    ref,
  );

  const isUnavailable = state.isCellUnavailable(props.date);
  const isLastSelectedBeforeDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(props.date.add({days: 1}));
  const isFirstSelectedAfterDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(props.date.subtract({days: 1}));
  const highlightedRange = "highlightedRange" in state && state.highlightedRange;
  const isSelectionStart =
    isSelected && highlightedRange ? isSameDay(props.date, highlightedRange.start) : false;
  const isSelectionEnd =
    isSelected && highlightedRange ? isSameDay(props.date, highlightedRange.end) : false;
  const {locale} = useLocale();
  const dayOfWeek = getDayOfWeek(props.date, locale);
  const isRangeStart =
    isSelected && (isFirstSelectedAfterDisabled || dayOfWeek === 0 || props.date.day === 1);
  const isRangeEnd =
    isSelected &&
    (isLastSelectedBeforeDisabled ||
      dayOfWeek === 6 ||
      props.date.day === currentMonth.calendar.getDaysInMonth(currentMonth));

  const {focusProps, isFocusVisible} = useFocusRing();
  const {hoverProps, isHovered} = useHover({
    isDisabled: isDisabled || isUnavailable || state.isReadOnly,
  });

  return (
    <td className={slots?.cell({class: classNames?.cell})} data-slot="cell" {...cellProps}>
      <span
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        ref={ref}
        className={slots?.cellButton({class: classNames?.cellButton})}
        data-disabled={dataAttr(isDisabled && !isInvalid)}
        data-focus-visible={dataAttr(isFocused && isFocusVisible)}
        data-hover={dataAttr(isHovered)}
        data-invalid={dataAttr(isInvalid)}
        data-outside-month={dataAttr(!isSameMonth(props.date, currentMonth))}
        data-pressed={dataAttr(isPressed && !state.isReadOnly)}
        data-range-end={dataAttr(isRangeEnd)}
        data-range-selection={dataAttr(isSelected && "highlightedRange" in state)}
        data-range-start={dataAttr(isRangeStart)}
        data-readonly={dataAttr(state.isReadOnly)}
        data-selected={dataAttr(isSelected)}
        data-selection-end={dataAttr(isSelectionEnd)}
        data-selection-start={dataAttr(isSelectionStart)}
        data-today={dataAttr(isToday(props.date, state.timeZone))}
        data-unavailable={dataAttr(isUnavailable)}
      >
        <span>{formattedDate}</span>
      </span>
    </td>
  );
}
