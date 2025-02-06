import {RangeCalendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="flex gap-x-4">
      <RangeCalendar aria-label="Date (No Selection)" />
      <RangeCalendar
        aria-label="Date (Uncontrolled)"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({weeks: 1}),
        }}
      />
    </div>
  );
}
