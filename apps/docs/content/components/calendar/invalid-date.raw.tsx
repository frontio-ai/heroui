import type {DateValue} from "@react-types/calendar";

import React from "react";
import {Calendar} from "@heroui/react";
import {today, getLocalTimeZone, isWeekend} from "@heroui/internationalized-date";
import {useLocale} from "@heroui/react-aria-i18n";

export default function App() {
  let [date, setDate] = React.useState<DateValue | null>(today(getLocalTimeZone()));
  let {locale} = useLocale();
  let isInvalid = isWeekend(date!, locale);

  return (
    <Calendar
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
    />
  );
}
