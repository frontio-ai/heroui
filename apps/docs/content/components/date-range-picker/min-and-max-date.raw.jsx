import {DateRangePicker} from "@heroui/react";
import {getLocalTimeZone, parseDate, today} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <div className="w-full flex flex-col gap-1">
        <h3>Min date</h3>
        <DateRangePicker
          defaultValue={{
            start: today(getLocalTimeZone()).subtract({days: 1}),
            end: parseDate("2024-04-08"),
          }}
          label="Date and time"
          minValue={today(getLocalTimeZone())}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h3>Max date</h3>
        <DateRangePicker
          defaultValue={{
            start: today(getLocalTimeZone()).subtract({days: 1}),
            end: parseDate("2024-04-08"),
          }}
          label="Date and time"
          maxValue={today(getLocalTimeZone())}
        />
      </div>
    </div>
  );
}
