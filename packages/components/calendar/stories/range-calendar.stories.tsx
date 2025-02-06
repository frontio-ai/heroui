import type {RangeValue, DateValue} from "../src";

import React from "react";
import {Meta} from "@storybook/react";
import {calendar} from "@heroui/theme";
import {
  today,
  getLocalTimeZone,
  isWeekend,
  CalendarDate,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
} from "@heroui/internationalized-date";
import {I18nProvider, useLocale} from "@heroui/react-aria-i18n";
import {Button, ButtonGroup} from "@heroui/button";
import {Radio, RadioGroup} from "@heroui/radio";
import {cn} from "@heroui/theme";

import {RangeCalendar, RangeCalendarProps} from "../src";

export default {
  title: "Components/RangeCalendar",
  component: RangeCalendar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    visibleMonths: {
      control: {type: "number", min: 1, max: 3},
    },
    color: {
      control: {
        type: "select",
      },
      options: ["foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    weekdayStyle: {
      control: {
        type: "select",
      },
      options: ["narrow", "short", "long"],
    },
  },
} as Meta<typeof RangeCalendar>;

const defaultProps = {
  ...calendar.defaultVariants,
  visibleMonths: 1,
};

const Template = (args: RangeCalendarProps) => <RangeCalendar {...args} />;

const ControlledTemplate = (args: RangeCalendarProps) => {
  const defaultValue = {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  };

  let [value, setValue] = React.useState<RangeValue<DateValue> | null>(defaultValue);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (uncontrolled)</p>
        <RangeCalendar
          aria-label="Date range (uncontrolled)"
          defaultValue={defaultValue}
          {...args}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (controlled)</p>
        <RangeCalendar
          aria-label="Date range (controlled)"
          value={value}
          onChange={setValue}
          {...args}
          color="secondary"
        />
      </div>
    </div>
  );
};

const UnavailableDatesTemplate = (args: RangeCalendarProps) => {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  let isDateUnavailable = (date) =>
    disabledRanges.some(
      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );

  return (
    <RangeCalendar
      aria-label="Stay dates"
      isDateUnavailable={isDateUnavailable}
      minValue={now}
      {...args}
    />
  );
};

const NonContiguousRangesTemplate = (args: RangeCalendarProps) => {
  let {locale} = useLocale();

  return (
    <RangeCalendar
      allowsNonContiguousRanges
      aria-label="Time off request"
      isDateUnavailable={(date) => isWeekend(date, locale)}
      {...args}
    />
  );
};

const ControlledFocusedValueTemplate = (args: RangeCalendarProps) => {
  let defaultDate = new CalendarDate(2024, 3, 1);
  let [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <div className="flex flex-col gap-4">
      <RangeCalendar focusedValue={focusedDate} onFocusChange={setFocusedDate} {...args} />
      <Button
        className="max-w-fit"
        color="primary"
        variant="flat"
        onPress={() => setFocusedDate(defaultDate)}
      >
        Reset focused date
      </Button>
    </div>
  );
};

const InvalidDatesTemplate = (args: RangeCalendarProps) => {
  let [date, setDate] = React.useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });

  let {locale} = useLocale();
  let isInvalid = isWeekend(date.start, locale) || isWeekend(date.end, locale);

  return (
    <RangeCalendar
      {...args}
      aria-label="Stay dates"
      errorMessage={isInvalid ? "Stay dates cannot fall on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
    />
  );
};

const InternationalCalendarsTemplate = (args: RangeCalendarProps) => {
  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="zh-CN-u-ca-chinese">
        <RangeCalendar aria-label="Appointment date" {...args} />
      </I18nProvider>
    </div>
  );
};

const PresetsTemplate = (args: RangeCalendarProps) => {
  let [value, setValue] = React.useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1, days: 3}),
  });

  let [focusedValue, setFocusedValue] = React.useState<DateValue | null>(today(getLocalTimeZone()));

  let {locale} = useLocale();

  let now = today(getLocalTimeZone());
  let nextMonth = now.add({months: 1});

  let nextWeek = {
    start: startOfWeek(now.add({weeks: 1}), locale),
    end: endOfWeek(now.add({weeks: 1}), locale),
  };
  let thisMonth = {start: startOfMonth(now), end: endOfMonth(now)};
  let nextMonthValue = {start: startOfMonth(nextMonth), end: endOfMonth(nextMonth)};

  const CustomRadio = (props) => {
    const {children, ...otherProps} = props;

    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
            "cursor-pointer rounded-full border-2 border-default-200/60",
            "data-[selected=true]:border-primary",
          ),
          label: "text-tiny text-default-500",
          labelWrapper: "px-1 m-0",
          wrapper: "hidden",
        }}
      >
        {children}
      </Radio>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <RangeCalendar
        bottomContent={
          <RadioGroup
            aria-label="Date precision"
            classNames={{
              base: "w-full pb-2",
              wrapper: "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-x-scroll",
            }}
            defaultValue="exact_dates"
            orientation="horizontal"
          >
            <CustomRadio value="exact_dates">Exact dates</CustomRadio>
            <CustomRadio value="1_day">1 day</CustomRadio>
            <CustomRadio value="2_days">2 days</CustomRadio>
            <CustomRadio value="3_days">3 days</CustomRadio>
            <CustomRadio value="7_days">7 days</CustomRadio>
            <CustomRadio value="14_days">14 days</CustomRadio>
          </RadioGroup>
        }
        classNames={{
          content: "w-full",
        }}
        focusedValue={focusedValue}
        nextButtonProps={{
          variant: "bordered",
        }}
        prevButtonProps={{
          variant: "bordered",
        }}
        topContent={
          <ButtonGroup
            fullWidth
            className="px-3 max-w-full pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button
              onPress={() => {
                setValue(nextWeek);
                setFocusedValue(nextWeek.end);
              }}
            >
              Next week
            </Button>
            <Button
              onPress={() => {
                setValue(thisMonth);
                setFocusedValue(thisMonth.start);
              }}
            >
              This month
            </Button>
            <Button
              onPress={() => {
                setValue(nextMonthValue), setFocusedValue(nextMonthValue.start);
              }}
            >
              Next month
            </Button>
          </ButtonGroup>
        }
        value={value}
        onChange={setValue}
        onFocusChange={setFocusedValue}
        {...args}
      />
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    value: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({weeks: 1}),
    },
    isReadOnly: true,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const MinDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({weeks: 1}),
    },
    minValue: today(getLocalTimeZone()),
  },
};

export const MaxDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: {
      start: today(getLocalTimeZone()).subtract({weeks: 1}),
      end: today(getLocalTimeZone()),
    },
    maxValue: today(getLocalTimeZone()),
  },
};

export const UnavailableDates = {
  render: UnavailableDatesTemplate,
  args: {
    ...defaultProps,
    defaultValue: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({weeks: 1}),
    },
  },
};

export const NonContiguousRanges = {
  render: NonContiguousRangesTemplate,
  args: {
    ...defaultProps,
  },
};

export const ControlledFocusedValue = {
  render: ControlledFocusedValueTemplate,
  args: {
    ...defaultProps,
  },
};

export const InvalidDates = {
  render: InvalidDatesTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithMonthAndYearPickers = {
  render: Template,
  args: {
    ...defaultProps,
    showMonthAndYearPickers: true,
  },
};

export const InternationalCalendars = {
  render: InternationalCalendarsTemplate,
  args: {
    ...defaultProps,
  },
};

export const VisibleMonths = {
  render: Template,
  args: {
    ...defaultProps,
    visibleMonths: 3,
  },
};

export const PageBehavior = {
  render: Template,
  args: {
    ...defaultProps,
    visibleMonths: 3,
    pageBehavior: "single",
  },
};

export const Presets = {
  render: PresetsTemplate,
  args: {
    ...defaultProps,
  },
};
