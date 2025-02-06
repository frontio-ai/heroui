import {RangeCalendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <RangeCalendar
      aria-label="Date (Controlled Focused Value)"
      focusedValue={focusedDate}
      onFocusChange={setFocusedDate}
    />
  );
}
