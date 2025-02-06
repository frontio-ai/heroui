import {RangeCalendar} from "@heroui/react";
import {today, getLocalTimeZone, isWeekend} from "@heroui/internationalized-date";
import {useLocale} from "@heroui/react-aria-i18n";

export default function App() {
  let [date, setDate] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });
  let {locale} = useLocale();
  let isInvalid = isWeekend(date.start, locale) || isWeekend(date.end, locale);

  return (
    <RangeCalendar
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
    />
  );
}
