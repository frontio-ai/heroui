import type {AriaButtonProps} from "@react-types/button";
import type {As, HTMLHeroUIProps} from "@heroui/system";
import type {ButtonProps} from "@heroui/button";
import type {HTMLAttributes, ReactNode, RefObject} from "react";

import {forwardRef, Fragment, useState} from "react";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {Button} from "@heroui/button";
import {chain, mergeProps} from "@react-aria/utils";
import {AnimatePresence, LazyMotion, MotionConfig} from "framer-motion";
import {useLocale} from "@react-aria/i18n";
import {ResizablePanel} from "@heroui/framer-utils";

import {ChevronLeftIcon} from "./chevron-left";
import {ChevronRightIcon} from "./chevron-right";
import {CalendarMonth} from "./calendar-month";
import {transition} from "./calendar-transitions";
import {CalendarHeader} from "./calendar-header";
import {CalendarPicker} from "./calendar-picker";
import {useCalendarContext} from "./calendar-context";

const domAnimation = () => import("@heroui/dom-animation").then((res) => res.default);

export interface CalendarBaseProps extends HTMLHeroUIProps<"div"> {
  Component?: As;
  showHelper?: boolean;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  calendarProps: HTMLAttributes<HTMLElement>;
  nextButtonProps: AriaButtonProps;
  prevButtonProps: AriaButtonProps;
  buttonPickerProps?: ButtonProps;
  errorMessageProps: HTMLAttributes<HTMLElement>;
  calendarRef: RefObject<HTMLDivElement>;
  errorMessage?: ReactNode;
}

/**
 * Avoid this framer-motion warning:
 * Function components cannot be given refs.
 * Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
 *
 * @see https://www.framer.com/motion/animate-presence/###mode
 */
const PopLayoutWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  },
);

PopLayoutWrapper.displayName = "HeroUI - PopLayoutWrapper";

export function CalendarBase(props: CalendarBaseProps) {
  const {
    Component = "div",
    showHelper,
    topContent,
    bottomContent,
    calendarProps,
    nextButtonProps,
    prevButtonProps,
    buttonPickerProps,
    errorMessageProps,
    calendarRef: ref,
    errorMessage,
    ...otherProps
  } = props;

  const {state, slots, visibleMonths, showMonthAndYearPickers, disableAnimation, classNames} =
    useCalendarContext();

  const [direction, setDirection] = useState<number>(0);

  const {direction: localeDirection} = useLocale();

  const currentMonth = state.visibleRange.start;

  const headers: React.ReactNode[] = [];
  const calendars: React.ReactNode[] = [];

  const isRTL = localeDirection === "rtl";

  for (let i = 0; i < visibleMonths; i++) {
    let d = currentMonth.add({months: i});

    headers.push(
      <Fragment key={`calendar-header-${i}`}>
        {i === 0 && (
          <Button
            {...(isRTL ? nextButtonProps : prevButtonProps)}
            onPress={chain(isRTL ? nextButtonProps.onPress : prevButtonProps.onPress, () =>
              setDirection(-1),
            )}
          >
            <ChevronLeftIcon />
          </Button>
        )}
        <CalendarHeader
          buttonPickerProps={buttonPickerProps}
          currentMonth={currentMonth}
          date={d}
          direction={direction}
        />
        {i === visibleMonths - 1 && (
          <Button
            {...(isRTL ? prevButtonProps : nextButtonProps)}
            onPress={chain(isRTL ? prevButtonProps.onPress : nextButtonProps.onPress, () =>
              setDirection(1),
            )}
          >
            <ChevronRightIcon />
          </Button>
        )}
      </Fragment>,
    );

    const calendarMonthContent = (
      <CalendarMonth
        {...props}
        key={`calendar-month-${i}`}
        currentMonth={currentMonth.month}
        direction={direction}
        startDate={d}
      />
    );

    calendars.push(
      showMonthAndYearPickers ? (
        <Fragment key={`calendar-month-with-pickers-${i}`}>
          {calendarMonthContent}
          <CalendarPicker currentMonth={currentMonth} date={d} />
        </Fragment>
      ) : (
        calendarMonthContent
      ),
    );
  }

  const calendarContent = (
    <>
      <div
        key="header-wrapper"
        className={slots?.headerWrapper({class: classNames?.headerWrapper})}
        data-slot="header-wrapper"
      >
        {headers}
      </div>
      <div
        key="grid-wrapper"
        className={slots?.gridWrapper({class: classNames?.gridWrapper})}
        data-slot="grid-wrapper"
      >
        {calendars}
      </div>
    </>
  );

  return (
    <Component {...mergeProps(calendarProps, otherProps)} ref={ref}>
      {topContent}
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>
      {disableAnimation ? (
        <div className={slots?.content({class: classNames?.content})} data-slot="content">
          {calendarContent}
        </div>
      ) : (
        <ResizablePanel
          className={slots?.content({class: classNames?.content})}
          data-slot="content"
        >
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <PopLayoutWrapper>
              <MotionConfig transition={transition}>
                <LazyMotion features={domAnimation}>{calendarContent}</LazyMotion>
              </MotionConfig>
            </PopLayoutWrapper>
          </AnimatePresence>
        </ResizablePanel>
      )}
      {/* For touch screen readers, add a visually hidden next button after the month grid
       * so it's easy to navigate after reaching the end without going all the way
       * back to the start of the month. */}
      <VisuallyHidden>
        <button
          aria-label={nextButtonProps["aria-label"]}
          disabled={nextButtonProps.isDisabled}
          tabIndex={-1}
          onClick={() => state.focusNextPage()}
        />
      </VisuallyHidden>
      {state.isValueInvalid && showHelper && (
        <div
          className={slots?.helperWrapper({class: classNames?.helperWrapper})}
          data-slot="helper-wrapper"
        >
          <span
            {...errorMessageProps}
            className={slots?.errorMessage({class: classNames?.errorMessage})}
            data-slot="error-message"
          >
            {errorMessage || "Selected date unavailable."}
          </span>
        </div>
      )}
      {bottomContent}
    </Component>
  );
}
