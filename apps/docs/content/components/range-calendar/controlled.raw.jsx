import {RangeCalendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  let [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });

  return <RangeCalendar aria-label="Date (Controlled)" value={value} onChange={setValue} />;
}
