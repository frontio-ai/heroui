import React from "react";
import {Meta} from "@storybook/react";
import {calendar} from "@heroui/theme";
import {
  today,
  parseDate,
  getLocalTimeZone,
  isWeekend,
  startOfWeek,
  startOfMonth,
} from "@heroui/internationalized-date";
import {I18nProvider, useLocale} from "@heroui/react-aria-i18n";
import {Button, ButtonGroup} from "@heroui/button";
import {Radio, RadioGroup} from "@heroui/radio";
import {cn} from "@heroui/theme";
import {HeroUIProvider} from "@heroui/system";

import {Calendar, CalendarProps, DateValue} from "../src";

export default {
  title: "Components/Calendar",
  component: Calendar,
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
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Calendar>;

const defaultProps = {
  ...calendar.defaultVariants,
  visibleMonths: 1,
};

const Template = (args: CalendarProps) => <Calendar {...args} />;

const ControlledTemplate = (args: CalendarProps) => {
  let [value, setValue] = React.useState<DateValue | null>(parseDate("2024-03-07"));

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (uncontrolled)</p>
        <Calendar
          aria-label="Date (uncontrolled)"
          defaultValue={parseDate("2024-03-07")}
          {...args}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (controlled)</p>
        <Calendar
          aria-label="Date (controlled)"
          value={value}
          onChange={setValue}
          {...args}
          color="secondary"
        />
      </div>
    </div>
  );
};

const UnavailableDatesTemplate = (args: CalendarProps) => {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  let {locale} = useLocale();

  let isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );

  return (
    <Calendar
      aria-label="Appointment date"
      isDateUnavailable={isDateUnavailable}
      minValue={today(getLocalTimeZone())}
      {...args}
    />
  );
};

const ControlledFocusedValueTemplate = (args: CalendarProps) => {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState<DateValue | null>(defaultDate);

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        focusedValue={focusedDate}
        value={defaultDate}
        onFocusChange={setFocusedDate}
        {...args}
      />
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

const InvalidDateTemplate = (args: CalendarProps) => {
  let [date, setDate] = React.useState<DateValue | null>(today(getLocalTimeZone()));
  let {locale} = useLocale();
  let isInvalid = isWeekend(date, locale);

  return (
    <Calendar
      {...args}
      aria-label="Appointment date"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
    />
  );
};

const InternationalCalendarsTemplate = (args: CalendarProps) => {
  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="zh-CN-u-ca-chinese">
        <Calendar aria-label="Appointment date" {...args} />
      </I18nProvider>
    </div>
  );
};

const PresetsTemplate = (args: CalendarProps) => {
  let defaultDate = today(getLocalTimeZone());
  let [value, setValue] = React.useState<DateValue | null>(defaultDate);
  let {locale} = useLocale();

  let now = today(getLocalTimeZone());
  let nextWeek = startOfWeek(now.add({weeks: 1}), locale);
  let nextMonth = startOfMonth(now.add({months: 1}));

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
      <Calendar
        bottomContent={
          <RadioGroup
            aria-label="Date precision"
            classNames={{
              base: "w-full pb-2",
              wrapper: "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-scroll",
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
        focusedValue={value}
        nextButtonProps={{
          variant: "bordered",
        }}
        prevButtonProps={{
          variant: "bordered",
        }}
        topContent={
          <ButtonGroup
            fullWidth
            className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button onPress={() => setValue(now)}>Today</Button>
            <Button onPress={() => setValue(nextWeek)}>Next week</Button>
            <Button onPress={() => setValue(nextMonth)}>Next month</Button>
          </ButtonGroup>
        }
        value={value}
        onChange={setValue}
        onFocusChange={setValue}
        {...args}
      />
    </div>
  );
};

const CalendarWidthTemplate = (args: CalendarProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">calendarWidth: 300</p>
        <Calendar {...args} calendarWidth={300} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">calendarWidth: 300px</p>
        <Calendar {...args} calendarWidth="300px" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">calendarWidth: 30em</p>
        <Calendar {...args} calendarWidth="30em" />
      </div>
    </div>
  );
};

const ReducedMotionTemplate = (args: CalendarProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">reducedMotion: never</p>
        <HeroUIProvider reducedMotion="never">
          <Calendar {...args} />
        </HeroUIProvider>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">reducedMotion: always</p>
        <HeroUIProvider reducedMotion="always">
          <Calendar {...args} />
        </HeroUIProvider>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">reducedMotion: user</p>
        <HeroUIProvider reducedMotion="user">
          <Calendar {...args} />
        </HeroUIProvider>
      </div>
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
    value: today(getLocalTimeZone()),
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
    defaultValue: today(getLocalTimeZone()),
    minValue: today(getLocalTimeZone()),
  },
};

export const MaxDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()),
  },
};

export const UnavailableDates = {
  render: UnavailableDatesTemplate,
  args: {
    ...defaultProps,
    defaultValue: today(getLocalTimeZone()),
    unavailableDates: [today(getLocalTimeZone())],
  },
};

export const ControlledFocusedValue = {
  render: ControlledFocusedValueTemplate,
  args: {
    ...defaultProps,
  },
};

export const InvalidDate = {
  render: InvalidDateTemplate,
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
    showMonthAndYearPickers: true,
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

export const CalendarWidth = {
  render: CalendarWidthTemplate,
  args: {
    ...defaultProps,
  },
};

export const ReducedMotion = {
  render: ReducedMotionTemplate,
  args: {
    ...defaultProps,
  },
};
