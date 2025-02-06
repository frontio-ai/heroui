import {CalendarDate, endOfMonth, getWeeksInMonth} from "@heroui/internationalized-date";
import {CalendarPropsBase} from "@react-types/calendar";
import {HTMLHeroUIProps} from "@heroui/system";
import {useLocale} from "@heroui/react-aria-i18n";
import {useCalendarGrid} from "@react-aria/calendar";
import {m} from "@heroui/motion";
import {dataAttr, getInertValue} from "@heroui/shared-utils";

import {CalendarCell} from "./calendar-cell";
import {slideVariants} from "./calendar-transitions";
import {useCalendarContext} from "./calendar-context";

export interface CalendarMonthProps extends HTMLHeroUIProps<"table">, CalendarPropsBase {
  startDate: CalendarDate;
  currentMonth: number;
  direction: number;
}

export function CalendarMonth(props: CalendarMonthProps) {
  const {startDate, direction, currentMonth} = props;

  const {locale} = useLocale();
  const weeksInMonth = getWeeksInMonth(startDate, locale);

  const {state, slots, weekdayStyle, isHeaderExpanded, disableAnimation, classNames} =
    useCalendarContext();

  const {gridProps, headerProps, weekDays} = useCalendarGrid(
    {
      ...props,
      weekdayStyle,
      endDate: endOfMonth(startDate),
    },
    state,
  );

  const bodyContent = [...new Array(weeksInMonth).keys()].map((weekIndex) => (
    <tr
      key={weekIndex}
      className={slots?.gridBodyRow({class: classNames?.gridBodyRow})}
      data-slot="grid-body-row"
      // makes the browser ignore the element and its children when tabbing
      // @ts-ignore
      inert={getInertValue(!!isHeaderExpanded)}
    >
      {state
        .getDatesInWeek(weekIndex, startDate)
        .map((date, i) =>
          date ? (
            <CalendarCell
              key={i}
              classNames={classNames}
              currentMonth={startDate}
              date={date}
              isPickerVisible={isHeaderExpanded}
              slots={slots}
              state={state}
            />
          ) : (
            <td key={i} />
          ),
        )}
    </tr>
  ));

  return (
    <table
      {...gridProps}
      aria-hidden={dataAttr(isHeaderExpanded)}
      className={slots?.grid({class: classNames?.grid})}
      data-slot="grid"
      tabIndex={-1}
    >
      <thead
        {...headerProps}
        className={slots?.gridHeader({class: classNames?.gridHeader})}
        data-slot="grid-header"
      >
        <tr
          className={slots?.gridHeaderRow({class: classNames?.gridHeaderRow})}
          data-slot="grid-header-row"
        >
          {weekDays.map((day, index) => (
            <th
              key={index}
              className={slots?.gridHeaderCell({class: classNames?.gridHeaderCell})}
              data-slot="grid-header-cell"
            >
              <span>{day}</span>
            </th>
          ))}
        </tr>
      </thead>
      {disableAnimation ? (
        <tbody
          key={currentMonth}
          className={slots?.gridBody({class: classNames?.gridBody})}
          data-slot="grid-body"
          tabIndex={isHeaderExpanded ? -1 : 0}
        >
          {bodyContent}
        </tbody>
      ) : (
        <m.tbody
          key={currentMonth}
          animate="center"
          className={slots?.gridBody({class: classNames?.gridBody})}
          custom={direction}
          data-slot="grid-body"
          exit="exit"
          initial="enter"
          variants={slideVariants}
        >
          {bodyContent}
        </m.tbody>
      )}
    </table>
  );
}
