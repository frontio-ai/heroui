import {RangeCalendar} from "@heroui/react";
import {isWeekend} from "@heroui/internationalized-date";
import {useLocale} from "@heroui/react-aria-i18n";

export default function App() {
  let {locale} = useLocale();

  return (
    <RangeCalendar
      allowsNonContiguousRanges
      aria-label="Time off request"
      isDateUnavailable={(date) => isWeekend(date, locale)}
    />
  );
}
