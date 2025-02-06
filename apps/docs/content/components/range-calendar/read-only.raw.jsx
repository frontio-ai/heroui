import {RangeCalendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  return (
    <RangeCalendar
      isReadOnly
      aria-label="Date (Read Only)"
      value={{
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({weeks: 1}),
      }}
    />
  );
}
