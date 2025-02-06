import {DateRangePicker} from "@heroui/react";
import {isWeekend, today, getLocalTimeZone} from "@heroui/internationalized-date";
import {useLocale} from "@heroui/react-aria-i18n";

export default function App() {
  let {locale} = useLocale();

  return (
    <DateRangePicker
      allowsNonContiguousRanges
      isDateUnavailable={(date) => isWeekend(date, locale)}
      label="Time off request"
      minValue={today(getLocalTimeZone())}
      visibleMonths={2}
    />
  );
}
