import {Calendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  return (
    <Calendar
      aria-label="Date (Min Date Value)"
      defaultValue={today(getLocalTimeZone())}
      minValue={today(getLocalTimeZone())}
    />
  );
}
