import {DateRangePicker} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  return (
    <DateRangePicker
      isDateUnavailable={(date) =>
        disabledRanges.some(
          (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
        )
      }
      label="Stay duration"
      minValue={today(getLocalTimeZone())}
      validate={(value) =>
        disabledRanges.some(
          (interval) =>
            value && value.end.compare(interval[0]) >= 0 && value.start.compare(interval[1]) <= 0,
        )
          ? "Selected date range may not include unavailable dates."
          : null
      }
      validationBehavior="native"
    />
  );
}
