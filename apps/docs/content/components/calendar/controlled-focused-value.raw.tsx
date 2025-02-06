import type {DateValue} from "@react-types/calendar";

import React from "react";
import {Calendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState<DateValue | null>(defaultDate);

  return (
    <Calendar
      aria-label="Date (Controlled Focused Value)"
      focusedValue={focusedDate}
      value={defaultDate}
      onFocusChange={setFocusedDate}
    />
  );
}
