import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";

import React from "react";
import {RangeCalendar, Radio, RadioGroup, Button, ButtonGroup, cn} from "@heroui/react";
import {
  today,
  getLocalTimeZone,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "@heroui/internationalized-date";
import {useLocale} from "@heroui/react-aria-i18n";

export default function App() {
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
      />
    </div>
  );
}
